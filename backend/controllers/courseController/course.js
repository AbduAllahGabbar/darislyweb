const Sequelize = require("sequelize");
const { sequelize } = require("../../models/index");
const {
  Attendance,
  Center,
  Course,
  Section,
  Tutor,
  Lecture,
  Student,
  Subject,
  CourseGroup,
  CourseGroupSession,
  Product,
} = require("../../models");
const AppError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");
const createPaginationObject = require("../../utils/createPaginationObject");
const { CourseGroupTypes, ProductTypes } = require("../../enums/index");
const { awsBucketUrl } = require("../../utils/constants");
const { INTEGER } = require("sequelize");

/**
 * URL: /courses
 * Method: POST
 * Body: { description, subjectId, education, grade, sections: [{title, lectures: [{title,price}}], groups: [type, center, capacity, startDate, endDate, days: {1: from,to}] }
 * Response: OK
 */

// DONE get tutor id from the logged in user

exports.createCourse = catchAsync(async (req, res, next) => {
  const tutorId = req.user.id;

  const courseObject = {
    description: req.body.description,
    subjectId: req.body.subjectId,
    education: req.body.education,
    grade: req.body.grade,
    tutorId: tutorId,
  };

  let { sections, groups } = req.body;

  ///Format group weekDays and centerId
  groups.forEach((group, index) => {
    let weekDays = Object.keys(group.weekDays).map((key) => {
      return { day: parseInt(key), ...group.weekDays[key] };
    });
    groups[index].weekDays = weekDays;
    if (group.centerId === "" || group.type === 0)
      groups[index].centerId = null;
  });

  let course;
  let createdGroups;
  let createdSections;

  await sequelize.transaction(async (transaction) => {
    course = await Course.create(courseObject, { transaction });

    const courseId = course.id;

    if (sections) {
      sections = await parseSectionFromObject(sections, courseId);

      createdSections = await Section.bulkCreate(sections, {
        validate: true,
        include: {
          model: Lecture,
          as: "lectures",
          attributes: ["title", "price", "courseId", "order"],
        },
        attributes: ["title", "lectures", "courseId", "order"],
        transaction: transaction,
      });
    }

    if (groups) {
      groups.forEach((group) => {
        group.courseId = courseId;
        group.weekDays = JSON.stringify(group.weekDays);
      });

      createdGroups = await CourseGroup.bulkCreate(groups, {
        attributes: [
          "areaId",
          "cityId",
          "address",
          "weekDays",
          "startDate",
          "endDate",
          "centerId",
          "capacity",
          "type",
        ],
        validate: true,
        transaction: transaction,
      });
    }

    if (groups && sections) {
      const createdLectures = createdSections
        .map((el) => el.toJSON())
        .reduce((lectures, section) => {
          return lectures.concat(section.lectures);
        }, []);

      await createSessionsFromGroups(
        createdGroups,
        createdLectures,
        transaction
      );
    }
  });

  res.status(200).json(course);
});

const createSessionsFromGroups = async (groups, lectures, transaction) => {
  const sessionsArray = [];

  for (let group of groups) {
    const lastSessionDateFound = group.dataValues.lastSessionDate;

    const currentDate = lastSessionDateFound
      ? new Date(group.dataValues.lastSessionDate)
      : new Date(group.dataValues.startDate);

    const weekDays =
      typeof group.weekDays === "object"
        ? group.weekDays
        : JSON.parse(group.weekDays);
    let weekDaysIdx = 0;

    let maxOffset = Number.MAX_SAFE_INTEGER;

    weekDays.forEach((weekDay, idx) => {
      let daysOffset = (weekDay.day + 7 - currentDate.getDay()) % 7;

      if (daysOffset === 0 && lastSessionDateFound) daysOffset = 7;

      if (daysOffset < maxOffset) {
        weekDaysIdx = idx;
        maxOffset = daysOffset;
      }
    });

    for (let [idx, lecture] of lectures.entries()) {
      let daysOffset =
        (weekDays[weekDaysIdx].day + 7 - currentDate.getDay()) % 7;

      if (daysOffset === 0)
        daysOffset = idx === 0 && !lastSessionDateFound ? 0 : 7;

      currentDate.setDate(currentDate.getDate() + daysOffset);

      const product = await Product.create(
        { type: ProductTypes.SESSION },
        { transaction }
      );

      sessionsArray.push({
        courseGroupId: group.id,
        lectureId: lecture.id,
        from: weekDays[weekDaysIdx].from,
        to: weekDays[weekDaysIdx].to,
        date: currentDate.toISOString().split("T")[0],
        productId: product.id,
      });
      weekDaysIdx = (weekDaysIdx + 1) % weekDays.length;
    }
  }

  if (sessionsArray.length > 0) {
    await CourseGroupSession.bulkCreate(sessionsArray, {
      validate: true,
      fields: ["courseGroupId", "lectureId", "from", "to", "date", "productId"],
      transaction,
    });
  }
};

/**
 * URL: /courses/{courseId}
 * Method: GET
 * Response: {
 *  duration,
 *  lecturesCount,
 *  quizzesCount,
 *  subject,
 *  tutorName,
 *  desciption,
 *  enrolledStudents,
 *  rating,
 *  ratingCount,
 *  sections: [{name, lectures: [{name}, …]}, …]
 * }
 */

// TODO add duration, rating, ratingCount, enrolledStudents
// TODO test that quizzesCount and lecturesCount are correct
// TODO figure a way to add courseSections without having to add all fields

exports.getCourse = catchAsync(async (req, res, next) => {
  const { courseId } = req.params;
  const course = await Course.findOne({
    attributes: {
      include: [
        "id",
        "description",
        "education",
        "grade",
        [
          Sequelize.literal(
            `(SELECT COUNT(*) FROM lecture WHERE course_id = Course.id)`
          ),
          "lecturesCount",
        ],
        [
          Sequelize.literal(
            `(SELECT COUNT(*) FROM quiz where lecture_id IN (SELECT course_id FROM lecture WHERE course_id = Course.id) )`
          ),
          "quizzesCount",
        ],
        [sequelize.col("courseGroups.start_date"), "startDate"],
        [sequelize.col("courseGroups.end_date"), "endDate"],
        [
          Sequelize.literal(
            `(SELECT COUNT(*) FROM course_group WHERE (type = ${CourseGroupTypes.ONLINE} OR type = ${CourseGroupTypes.BOTH}) AND course_id = Course.id)`
          ),
          "onlineCount",
        ],
        [
          Sequelize.literal(
            `(SELECT COUNT(*) FROM course_group WHERE (type = ${CourseGroupTypes.CENTER} OR type = ${CourseGroupTypes.BOTH}) AND course_id = Course.id)`
          ),
          "centerCount",
        ],
      ],
    },
    where: {
      id: courseId,
    },
    include: [
      {
        model: Subject,
        as: "subject",
      },
      {
        model: Tutor,
        as: "tutor",
        attributes: [
          "id",
          "email",
          "firstName",
          "lastName",
          "phone",
          "countryCode",
          "country",
          "hasImage",
        ],
      },
      {
        model: CourseGroup,
        as: "courseGroups",
        attributes: [],
        // attributes:['startDate', 'endDate']
      },
    ],
    raw: true,
    nest: true,
  });

  if (course.tutor.hasImage) {
    course.tutor.imageUrl = `${awsBucketUrl}/tutors/images/${
      course.tutor.id
    }?${Date.now()}_`;
  }

  const courseSections = await Section.findAll({
    where: {
      course_id: courseId,
    },
    include: [
      {
        model: Lecture,
        as: "lectures",
        attributes: ["id", "title", "price", "order"],
      },
    ],
    order: ["order", ["lectures", "order"]],
  });

  course.sections = courseSections;

  course.taxPercentage = process.env.TAX_PERCENTAGE;
  course.serviceFees = process.env.FIXED_LECTURE_FEES;

  res.status(200).json(course);
});

/**
 * getCourses
 * URL: /courses
 * Method: GET
 * Response: {courses: [{subject, date, grade, progress, type}, ...]}
 */

// DONE add pagination

exports.getCourses = catchAsync(async (req, res, next) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 1000;

  const offset = (page - 1) * limit;

  const { count, rows } = await Course.findAndCountAll({
    attributes: ["id", "grade", "education", "hasImage", "createdAt"],
    include: [
      {
        model: Subject,
        as: "subject",
      },
      {
        model: Tutor,
        attributes: ["id", "firstName", "lastName", "hasImage"],
        as: "tutor",
      },
    ],
    offset: offset,
    limit: limit,
  });

  rows.forEach((course) => {
    if (course.tutor.hasImage) {
      course.tutor.setDataValue(
        "imageUrl",
        `${awsBucketUrl}/tutors/images/${course.tutor.id}?${Date.now()}_`
      );
    }
  });

  const pagingObject = createPaginationObject(page, limit, count, rows);

  res.status(200).json(pagingObject);
});

/**
 * patchCourse
 * URL: courses/:courseId
 * Method: PATCH
 * Response: OK
 */

exports.patchCourse = catchAsync(async (req, res, next) => {
  const { courseId } = req.params;

  await Course.update(req.body, {
    where: {
      id: courseId,
    },
    fields: ["subjectId", "education", "grade", "description"],
  });

  res.status(200).send();
});

/**
 * deleteCourse
 * URL: courses/:courseId
 * Method: DELETE
 * Response: OK
 */

exports.deleteCourse = catchAsync(async (req, res, next) => {
  const { courseId } = req.params;

  const destroyed = await Course.destroy({
    where: { id: courseId },
  });

  if (destroyed === 0)
    throw new AppError("No course was found with that id", 404);

  res.status(200).send();
});

/**
 * getTutorCourses
 * URL: tutors/{courseId}/courses
 * Method: GET
 * Response: [{id, subjectName}]
 */

// TODO figure out if the courseId should be omitted from the request

exports.getTutorCourses = catchAsync(async (req, res, next) => {
  const { tutorId } = req.params;

  const courses = await Course.findAll({
    attributes: ["id", "grade", "education"],
    include: [
      {
        model: Subject,
        as: "subject",
        attributes: ["id", "name"],
        required: false,
      },
      {
        model: Tutor,
        as: "tutor",
        attributes: [],
        required: true,
        where: {
          id: tutorId,
        },
      },
    ],
  });

  res.status(200).json(courses);
});

/**
 * createCourseLectures
 * URL: /courses/{courseId}/lectures
 * Method: POST
 * Body: { sections: [{ name, lectures: [{name,price}] }] }
 * Response: OK
 */

// DONE handle order of sections

const parseSectionFromObject = async (sections, courseId) => {
  // Get the order of the last section
  let lastSectionOrder = await Section.max("order", {
    where: { courseId: courseId },
  });

  if (!lastSectionOrder) lastSectionOrder = -1;

  // Construct the sections object to pass to bulkCreate
  sections.forEach((section, secIdx) => {
    section.courseId = courseId;
    section.order = secIdx + lastSectionOrder + 1;
    section.lectures.forEach((lecture, lecIdx) => {
      lecture.courseId = courseId;
      lecture.order = lecIdx;
    });
  });

  return sections;
};

exports.createCourseLectures = catchAsync(async (req, res, next) => {
  const { courseId } = req.params;
  let { sections } = req.body;

  sections = await parseSectionFromObject(sections, courseId);

  await sequelize.transaction(async (t) => {
    // Create the sections using the object constructed
    const createdSections = await Section.bulkCreate(sections, {
      validate: true,
      include: {
        model: Lecture,
        as: "lectures",
      },
      transaction: t,
    });

    const createdLectures = createdSections
      .map((el) => el.toJSON())
      .reduce((lectures, section) => {
        return lectures.concat(section.lectures);
      }, []);

    const groups = await CourseGroup.findAll({
      attributes: [
        "id",
        "weekDays",
        "startDate",
        "endDate",
        [
          Sequelize.literal(
            "(SELECT MAX(date) FROM course_group_session WHERE course_group_id = `CourseGroup`.`id`)"
          ),
          "lastSessionDate",
        ],
      ],
      where: {
        courseId: courseId,
      },
    });

    await createSessionsFromGroups(groups, createdLectures, t);
  });

  res.status(201).send();
});

/**
 * addAnnouncement
 * URL: courses/{courseId}/sessions/{sessionId}/announcement
 * Method: POST
 * Body: {title, description}
 * Response: OK
 */

exports.addAnnouncement = catchAsync(async (req, res, next) => {});

/**
 * getCourseStudents
 * URL: courses/{courseId}/students
 * Method: GET
 * Response: [{id, hasImage, name, phone}]
 */

// DONE add pagination
// TODO make sure to get students uniquely

exports.getCourseStudents = catchAsync(async (req, res, next) => {
  const { courseId } = req.params;

  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 1000;

  const offset = (page - 1) * limit;

  const { count, rows } = await Student.findAndCountAll({
    attributes: [
      "id",
      "hasImage",
      "firstName",
      "lastName",
      "countryCode",
      "phone",
    ],
    include: {
      model: Attendance,
      as: "attendances",
      attributes: [],
      required: true,
      include: {
        model: CourseGroupSession,
        as: "courseGroupSession",
        attributes: [],
        required: true,
        include: {
          model: CourseGroup,
          as: "courseGroup",
          attributes: [],
          required: true,
          include: {
            model: Course,
            as: "course",
            required: true,
            attributes: [],
            where: {
              id: courseId,
            },
          },
        },
      },
    },
    subQuery: false,
    distinct: true,
    offset: offset,
    limit: limit,
  });

  const pagingObject = createPaginationObject(page, limit, count, rows);

  res.status(200).json(pagingObject);
});

/**
 * getCourseGroups
 * URL: courses/{courseId}/groups
 * Method: GET
 * Response: { courseGroups: [ { weekDays: [‘SUN’, ‘MON’, ...], from, to}, ...]}
 */

exports.getCourseGroups = catchAsync(async (req, res, next) => {
  const { courseId } = req.params;

  let responseObject;

  if (req.query.type && req.query.type === "0") {
    responseObject = await CourseGroup.findAll({
      where: {
        courseId: courseId,
        type: [CourseGroupTypes.ONLINE, CourseGroupTypes.BOTH],
      },
      attributes: ["weekDays", "id", "startDate", "endDate", "type"],
    });
  } else if (req.query.type && req.query.type === "1") {
    responseObject = await Center.findAll({
      attributes: ["id", "name"],
      include: {
        model: CourseGroup,
        as: "courseGroups",
        attributes: [
          "weekDays",
          "id",
          "startDate",
          "endDate",
          "type",
          "centerId",
        ],
        required: true,
        where: {
          courseId: courseId,
          type: [CourseGroupTypes.CENTER, CourseGroupTypes.BOTH],
        },
      },
    });
  } else {
    responseObject = await CourseGroup.findAll({
      where: {
        courseId: courseId,
      },
      attributes: ["weekDays", "id", "startDate", "endDate", "type"],
    });
  }

  res.status(200).json(responseObject);
});

/**
 * createCourseGroup
 * URL: /courses/{courseId}/coursegroups
 * Method: POST
 * Body: {courseGroups: [areaId, cityId, address, weekDays:[’day1,day2’], startDate, endDate, centerId, capacity, type]}
 * Response: OK
 */

exports.createCourseGroup = catchAsync(async (req, res, next) => {
  const { courseId } = req.params;

  const { courseGroups } = req.body;

  courseGroups.forEach((group) => {
    group.courseId = courseId;
    group.weekDays = JSON.stringify(group.weekDays);
  });

  const createdCourseGroups = await CourseGroup.bulkCreate(courseGroups, {
    fields: [
      "areaId",
      "cityId",
      "address",
      "weekDays",
      "startDate",
      "endDate",
      "centerId",
      "capacity",
      "type",
    ],
    validate: true,
  });

  res.status(200).json(createdCourseGroups);
});

/**
 * patchCourseGroup
 * URL: /coursegroups/:courseGroupId
 * Method: PATCH,
 * Body: {areaId, cityId, address, weekDays:[’day1,day2’], startDate, endDate, centerId, capacity, type},
 * Response: OK
 */

exports.patchCourseGroup = catchAsync(async (req, res, next) => {
  const { courseGroupId } = req.params;

  const courseGroupObject = req.body;

  await CourseGroup.update(courseGroupObject, {
    where: {
      id: courseGroupId,
    },
    fields: [
      "areaId",
      "cityId",
      "address",
      "startDate",
      "endDate",
      "centerId",
      "capacity",
      "type",
    ],
    validate: true,
  });

  res.status(200).send();
});

exports.deleteCourseGroup = catchAsync(async (req, res, next) => {
  const { courseGroupId } = req.params;

  const destroyed = await CourseGroup.destroy({
    where: { id: courseGroupId },
  });

  if (destroyed === 0)
    throw new AppError("No course group was found with that id", 404);

  res.status(200).send();
});

exports.getCourseLectures = catchAsync(async (req, res, next) => {
  const { courseId } = req.params;

  const sections = await Section.findAll({
    attributes: ["id", "title"],
    include: {
      model: Lecture,
      as: "lectures",
      attributes: ["id", "title", "price"],
    },
    where: {
      courseId,
    },
    order: ["order", ["lectures", "order"]],
  });

  res.status(200).json(sections);
});

exports.getCourseBuilderData = catchAsync(async (req, res, next) => {
  const { courseId } = req.params;

  let course = await Course.findByPk(courseId, {
    attributes: ["id", "subjectId", "description", "education", "grade"],
    include: [
      {
        attributes: ["title", "id"],
        model: Section,
        as: "sections",
        include: {
          attributes: ["title", "price", "id"],
          model: Lecture,
          as: "lectures",
        },
      },
      {
        model: CourseGroup,
        as: "courseGroups",
        attributes: [
          "id",
          "type",
          "centerId",
          "capacity",
          "startDate",
          "endDate",
          "weekDays",
        ],
      },
    ],
  });

  course = course.toJSON();

  // remap the courseGroups array
  if (course.courseGroups) {
    course.groups = course.courseGroups.map((group) => {
      const weekDays = {};
      group.weekDays.forEach((weekDay) => {
        weekDays[weekDay.day] = weekDay;
        weekDays[weekDay.day].day = undefined;
      });
      group.weekDays = weekDays;
      return group;
    });
    course.courseGroups = undefined;
  }

  course.taxPercentage = process.env.TAX_PERCENTAGE;
  course.serviceFees = process.env.FIXED_LECTURE_FEES;

  res.status(200).json(course);
});

exports.patchCourseBuilderData = catchAsync(async (req, res, next) => {
  const { courseId } = req.params;

  let sections = req.body.sections;
  const groups = req.body.groups;

  sections = await parseSectionFromObject(sections, courseId);

  let newSections = [];
  let oldSections = [];
  let newLectures = [];
  let oldLectures = [];

  sections.forEach((section) => {
    if (section.id) {
      // section exists before
      if (section.lectures) {
        section.lectures.forEach((lecture) => {
          lecture.sectionId = section.id;
          // old lecture with old section
          if (lecture.id) oldLectures.push(lecture);
          // new lecture with old section
          else newLectures.push(lecture);
        });
      }
      delete section.lectures;
      oldSections.push(section);
    } else {
      // new section, push as is
      newSections.push(section);
    }
  });

  await sequelize.transaction(async (transaction) => {
    // Update the course data

    await Course.update(req.body, {
      attributes: ["subjectId", "description", "education", "grade"],
      where: {
        id: courseId,
      },
      transaction,
    });

    // Update existing sections and lectures & create non-existing sections and lectures

    const newlyCreatedSections = await Section.bulkCreate(newSections, {
      attributes: ["title", "courseId", "order"],
      transaction,
      validate: true,
      include: {
        model: Lecture,
        as: "lectures",
        attributes: ["title", "price", "courseId", "order"],
      },
    });

    const newlyCreatedLectures = await Lecture.bulkCreate(newLectures, {
      attributes: ["title", "price", "courseId", "order"],
      transaction,
    });

    await Section.bulkCreate(oldSections, {
      attributes: ["title", "courseId", "order"],
      updateOnDuplicate: ["title"],
      transaction,
    });

    const previouslyCreatedLectures = await Lecture.bulkCreate(oldLectures, {
      attributes: ["title", "price", "courseId", "order"],
      updateOnDuplicate: ["title", "price"],
      transaction,
    });

    let allNewLectures = [];

    newlyCreatedSections.forEach((section) => {
      if (section.lectures)
        section.lectures.forEach((lecture) => {
          allNewLectures.push(lecture);
        });
    });

    allNewLectures = allNewLectures.concat(newlyCreatedLectures);

    // Get new courseGroups objects to create them
    const newCourseGroups = [];

    groups.forEach((group, index) => {
      if (!group.id) {
        let weekDays = Object.keys(group.weekDays).map((key) => {
          return { day: parseInt(key), ...group.weekDays[key] };
        });
        groups[index].weekDays = weekDays;
        if (group.centerId === "" || group.type === 0)
          groups[index].centerId = null;

        group.courseId = courseId;
        group.weekDays = JSON.stringify(group.weekDays);
        newCourseGroups.push(group);
      }
    });

    // If there is any new courseGroup, go create

    if (newCourseGroups.length > 0) {
      let createdGroups = await CourseGroup.bulkCreate(newCourseGroups, {
        attributes: [
          "areaId",
          "cityId",
          "address",
          "weekDays",
          "startDate",
          "endDate",
          "centerId",
          "capacity",
          "type",
        ],
        validate: true,
        transaction: transaction,
      });

      await createSessionsFromGroups(
        createdGroups,
        previouslyCreatedLectures,
        transaction
      );
    }

    if (allNewLectures.length > 0) {
      const allGroups = await CourseGroup.findAll({
        attributes: [
          "areaId",
          "cityId",
          "address",
          "weekDays",
          "startDate",
          "endDate",
          "centerId",
          "capacity",
          "type",
          "id",
        ],
        validate: true,
        where: {
          courseId,
        },
        transaction,
      });

      await createSessionsFromGroups(allGroups, allNewLectures, transaction);
    }
  });

  res.status(200).send();
});

exports.getCourseLecturesForStudent = catchAsync(async (req, res, next) => {
  const { courseId, studentId } = req.params;
  const { orderId } = req.query;

  const excludeOrderLectures = orderId
    ? `AND \`course_group_session\`.\`id\` NOT IN (SELECT \`course_group_session_id\` FROM \`order_item\`
      WHERE \`order_item\`.\`order_id\` = ${orderId})`
    : "";

  const sections = await Section.findAll({
    attributes: ["id", "title"],
    include: {
      model: Lecture,
      as: "lectures",
      attributes: [
        "id",
        "title",
        "price",
        [
          Sequelize.literal(
            `(SELECT EXISTS (SELECT * FROM \`attendance\` INNER JOIN \`course_group_session\` ON \`attendance\`.\`course_group_session_id\` = \`course_group_session\`.\`id\` WHERE \`course_group_session\`.\`lecture_id\` = \`lectures\`.\`id\` AND \`attendance\`.\`student_id\` =${studentId} ${excludeOrderLectures}))`
          ),
          "purchased",
        ],
      ],
      where: {
        courseId,
      },
    },
    where: {
      courseId,
    },
    order: [
      ["order", "ASC"],
      [
        {
          model: Lecture,
          as: "lectures",
        },
        "order",
        "ASC",
      ],
    ],
  });

  res.status(200).json({
    sections,
  });
});

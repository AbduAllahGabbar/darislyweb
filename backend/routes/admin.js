const router = require("express").Router();
const sequelize = require("sequelize");
const crud = require("express-sequelize-crud").crud;
const Models = require("../models");
const bcrypt = require("bcryptjs");
const CryptoJS = require("crypto-js");
const { logout, contactUs } = require("../controllers/adminController/admin");
const {
  NotificationTypes,
  CourseGroupTypes,
  OrderStatusTypes,
} = require("../enums");

router.post("/logout", logout);

router.post("/contactus", contactUs);

router.use(
  crud("/areas", Models.Area, {
    getList: (filter, limit, offset, order) =>
      Models.Area.findAndCountAll({ limit, offset, order, where: filter }),
    getOne: (id) => Models.Area.findByPk(id),
    create: (body) => Models.Area.create(body),
    update: (body, options) => {
      return Models.Area.update(
        { ...body, name: JSON.stringify(body.name) },
        options
      );
    },
    destroy: (body) => Models.Area.destroy(body),
  })
);

router.use(crud("/attendance", Models.Attendance));
router.use(crud("/products", Models.Product));
router.use(
  crud("/centers", Models.Center, {
    getList: (filter, limit, offset, order) =>
      Models.Center.findAndCountAll({ limit, offset, order, where: filter }),
    getOne: (id) => Models.Center.findByPk(id),
    create: (body) => Models.Center.create(body),
    update: (body, options) => {
      return Models.Center.update(
        {
          ...body,
          name: JSON.stringify(body.name),
          address: JSON.stringify(body.address),
        },
        options
      );
    },
    destroy: (body) => Models.Center.destroy(body),
  })
);

router.use(
  crud("/cities", Models.City, {
    getList: (filter, limit, offset, order) =>
      Models.City.findAndCountAll({ limit, offset, order, where: filter }),
    getOne: (id) => Models.City.findByPk(id),
    create: (body) => Models.City.create(body),
    update: (body, options) => {
      return Models.City.update(
        { ...body, name: JSON.stringify(body.name) },
        options
      );
    },
    destroy: (body) => Models.City.destroy(body),
  })
);

router.use(crud("/courses", Models.Course));

router.use(
  crud("/coursegroups", Models.CourseGroup, {
    getList: (filter, limit, offset, order) =>
      Models.CourseGroup.findAndCountAll({
        limit,
        offset,
        order,
        where: filter,
      }),
    getOne: (id) => Models.CourseGroup.findByPk(id),
    create: (body) => Models.CourseGroup.create(body),
    update: (body, options) => {
      return Models.CourseGroup.update(
        { ...body, weekDays: JSON.stringify(body.weekDays) },
        options
      );
    },
    destroy: (body) => Models.CourseGroup.destroy(body),
  })
);

router.use(crud("/coursegroupsessions", Models.CourseGroupSession));
router.use(crud("/orders", Models.Order));
router.use(crud("/orderitems", Models.OrderItem));
router.use(crud("/quizzes", Models.Quiz));
router.use(crud("/quizanswers", Models.QuizAnswer));
router.use(crud("/sections", Models.Section));

router.use(
  crud("/admins", Models.Admin, {
    getList: (filter, limit, offset, order) =>
      Models.Admin.findAndCountAll({ limit, offset, order, where: filter }),
    getOne: (id) => Models.Admin.findByPk(id),
    create: async (body) => {
      body.password = await bcrypt.hash(body.password, 10);
      return Models.Admin.create(body);
    },
    update: async (body, options) => {
      const passwordChanged = typeof body.password === "string";
      if (passwordChanged) {
        body.password = await bcrypt.hash(body.password, 10);
      }
      return Models.Admin.update(
        {
          username: body.username,
          firstName: body.firstName,
          lastName: body.lastName,
          ...(passwordChanged ? { password: body.password } : {}),
        },
        options
      );
    },
    destroy: (body) => Models.Admin.destroy(body),
  })
);

router.use(
  crud("/staffs", Models.Staff, {
    getList: (filter, limit, offset, order) =>
      Models.Staff.findAndCountAll({ limit, offset, order, where: filter }),
    getOne: (id) => Models.Staff.findByPk(id),
    create: async (body) => {
      body.password = await bcrypt.hash(body.password, 10);
      return Models.Staff.create(body);
    },
    update: async (body, options) => {
      const passwordChanged = typeof body.password === "string";
      if (passwordChanged) {
        body.password = await bcrypt.hash(body.password, 10);
      }
      return Models.Staff.update(
        {
          username: body.username,
          firstName: body.firstName,
          lastName: body.lastName,
          ...(passwordChanged ? { password: body.password } : {}),
        },
        options
      );
    },
    destroy: (body) => Models.Staff.destroy(body),
  })
);

router.use(
  crud("/staffcenters", Models.StaffCenter, {
    getList: (filter, limit, offset) =>
      Models.StaffCenter.findAndCountAll({
        limit,
        offset,
        where: filter,
        attributes: {
          include: [
            "staffId",
            "centerId",
            [
              sequelize.fn(
                "concat",
                sequelize.col("staff_id"),
                "-",
                sequelize.col("center_id")
              ),
              "id",
            ],
          ],
        },
      }),
    getOne: (id) => Models.StaffCenter.findByPk(id),
    create: (body) => Models.StaffCenter.create(body),
    update: (body, options) => Models.StaffCenter.update(body, options),
    destroy: (body) => {
      const [staffId, centerId] = body.where.id.split("-");
      return Models.StaffCenter.destroy({ where: { staffId, centerId } });
    },
  })
);

router.use(
  crud("/students", Models.Student, {
    getList: (filter, limit, offset, order) =>
      Models.Student.findAndCountAll({ limit, offset, order, where: filter }),
    getOne: (id) => Models.Student.findByPk(id),
    create: (body) => Models.Student.create(body),
    update: (body, options) => {
      // console.log(body);
      return Models.Student.update(
        {
          firstName: body.firstName,
          lastName: body.lastName,
          email: body.email,
          countryCode: body.countryCode,
          phone: body.phone,
          phoneVerified: body.phoneVerified,
          emailVerified: body.emailVerified,
        },
        options
      );
    },
    destroy: (body) => Models.Student.destroy(body),
  })
);

router.use(
  crud("/subjects", Models.Subject, {
    getList: (filter, limit, offset, order) =>
      Models.Subject.findAndCountAll({ limit, offset, order, where: filter }),
    getOne: (id) => Models.Subject.findByPk(id),
    create: (body) => Models.Subject.create(body),
    update: (body, options) => {
      return Models.Subject.update(
        { ...body, name: JSON.stringify(body.name) },
        options
      );
    },
    destroy: (body) => Models.Subject.destroy(body),
  })
);

router.use(
  crud("/tutors", Models.Tutor, {
    getList: (filter, limit, offset, order) =>
      Models.Tutor.findAndCountAll({ limit, offset, order, where: filter }),
    getOne: (id) => Models.Tutor.findByPk(id),
    create: async (body) => {
      body.password = await bcrypt.hash(body.password, 10);
      body.country = 62;
      return Models.Tutor.create(body);
    },
    // update: (body, options) => Models.Tutor.update(body, options),
    update: async (body, options) => {
      const passwordChanged = typeof body.password === "string";
      if (passwordChanged) {
        body.password = await bcrypt.hash(body.password, 10);
      }
      return Models.Tutor.update(
        {
          firstName: body.firstName,
          lastName: body.lastName,
          email: body.email,
          countryCode: body.countryCode,
          phone: body.phone,
          hasImage: body.hasImage,
          ...(passwordChanged ? { password: body.password } : {}),
        },
        options
      );
    },
    destroy: (body) => Models.Tutor.destroy(body),
  })
);

router.use(
  crud("/livesessions", Models.LiveSession, {
    getList: async (filter, limit, offset, order) => {
      const liveSessions = await Models.LiveSession.findAndCountAll({
        limit,
        offset,
        order,
        where: filter,
      });
      liveSessions.rows.forEach((liveSession) => {
        if (liveSession.meetingId) {
          const decryptedMeetingId = CryptoJS.AES.decrypt(
            liveSession.meetingId.toString(),
            process.env.ZOOM_SECRET_STRING
          ).toString(CryptoJS.enc.Utf8);
          liveSession.setDataValue("meetingId", decryptedMeetingId);
        }

        if (liveSession.meetingPassword) {
          const decryptedMeetingPassword = CryptoJS.AES.decrypt(
            liveSession.meetingPassword.toString(),
            process.env.ZOOM_SECRET_STRING
          ).toString(CryptoJS.enc.Utf8);
          liveSession.setDataValue("meetingPassword", decryptedMeetingPassword);
        }

        if (liveSession.meetingUrl) {
          const decryptedMeetingUrl = CryptoJS.AES.decrypt(
            liveSession.meetingUrl.toString(),
            process.env.ZOOM_SECRET_STRING
          ).toString(CryptoJS.enc.Utf8);
          liveSession.setDataValue("meetingUrl", decryptedMeetingUrl);
        }
      });
      return liveSessions;
    },
    getOne: async (id) => {
      const liveSession = await Models.LiveSession.findByPk(id);

      if (liveSession.meetingId) {
        const decryptedMeetingId = CryptoJS.AES.decrypt(
          liveSession.meetingId.toString(),
          process.env.ZOOM_SECRET_STRING
        ).toString(CryptoJS.enc.Utf8);
        liveSession.setDataValue("meetingId", decryptedMeetingId);
      }

      if (liveSession.meetingPassword) {
        const decryptedMeetingPassword = CryptoJS.AES.decrypt(
          liveSession.meetingPassword.toString(),
          process.env.ZOOM_SECRET_STRING
        ).toString(CryptoJS.enc.Utf8);
        liveSession.setDataValue("meetingPassword", decryptedMeetingPassword);
      }

      if (liveSession.meetingUrl) {
        const decryptedMeetingUrl = CryptoJS.AES.decrypt(
          liveSession.meetingUrl.toString(),
          process.env.ZOOM_SECRET_STRING
        ).toString(CryptoJS.enc.Utf8);
        liveSession.setDataValue("meetingUrl", decryptedMeetingUrl);
      }

      return liveSession;
    },
    create: async (body) => {
      const meetingUrl = body.meetingUrl;

      if (body.meetingId) {
        body.meetingId = CryptoJS.AES.encrypt(
          body.meetingId,
          process.env.ZOOM_SECRET_STRING
        ).toString();
      }

      if (body.meetingPassword) {
        body.meetingPassword = CryptoJS.AES.encrypt(
          body.meetingPassword,
          process.env.ZOOM_SECRET_STRING
        ).toString();
      }

      if (body.meetingUrl) {
        body.meetingUrl = CryptoJS.AES.encrypt(
          body.meetingUrl,
          process.env.ZOOM_SECRET_STRING
        ).toString();
      }

      await createNotificationsForLiveSession(
        body.courseGroupSessionId,
        body.date,
        body.from,
        meetingUrl
      );

      return await Models.LiveSession.create(body);
    },
    update: async (body, options) => {
      if (body.meetingId) {
        body.meetingId = CryptoJS.AES.encrypt(
          body.meetingId,
          process.env.ZOOM_SECRET_STRING
        ).toString();
      }

      if (body.meetingPassword) {
        body.meetingPassword = CryptoJS.AES.encrypt(
          body.meetingPassword,
          process.env.ZOOM_SECRET_STRING
        ).toString();
      }

      if (body.meetingUrl) {
        body.meetingUrl = CryptoJS.AES.encrypt(
          body.meetingUrl,
          process.env.ZOOM_SECRET_STRING
        ).toString();
      }

      return Models.LiveSession.update(body, options);
    },
    destroy: (body) => Models.LiveSession.destroy(body),
  })
);

router.use(
  crud("/lectures", Models.Lecture, {
    getList: async (filter, limit, offset, order) => {
      const lectures = await Models.Lecture.findAndCountAll({
        limit,
        offset,
        order,
        where: filter,
      });
      lectures.rows.forEach((lecture) => {
        if (lecture.videoUrl) {
          const decryptedVideoUrl = CryptoJS.AES.decrypt(
            lecture.videoUrl.toString(),
            process.env.ZOOM_SECRET_STRING
          ).toString(CryptoJS.enc.Utf8);
          lecture.setDataValue("videoUrl", decryptedVideoUrl);
        }
      });
      return lectures;
    },
    getOne: async (id) => {
      const lecture = await Models.Lecture.findByPk(id);

      if (lecture.videoUrl) {
        const decryptedVideoUrl = CryptoJS.AES.decrypt(
          lecture.videoUrl.toString(),
          process.env.ZOOM_SECRET_STRING
        ).toString(CryptoJS.enc.Utf8);
        lecture.setDataValue("videoUrl", decryptedVideoUrl);
      }

      return lecture;
    },
    create: async (body) => {
      if (body.videoUrl) {
        body.videoUrl = CryptoJS.AES.encrypt(
          body.videoUrl,
          process.env.ZOOM_SECRET_STRING
        ).toString();
      }

      return Models.Lecture.create(body);
    },
    update: async (body, options) => {
      if (body.videoUrl) {
        body.videoUrl = CryptoJS.AES.encrypt(
          body.videoUrl,
          process.env.ZOOM_SECRET_STRING
        ).toString();
        await createNotificationsForLectureVideo(body.id);
      }

      return Models.Lecture.update(body, options);
    },
    destroy: (body) => Models.Lecture.destroy(body),
  })
);

router.use(
  crud("/announcements", Models.Announcement, {
    getList: (filter, limit, offset, order) =>
      Models.Announcement.findAndCountAll({
        limit,
        offset,
        order,
        where: filter,
      }),
    getOne: (id) => Models.Announcement.findByPk(id),
    create: async (body) => {
      await createNotificationsForAnnouncement(
        body.courseId,
        body.title,
        body.content
      );

      return await Models.Announcement.create(body);
    },
    update: (body, options) => Models.Announcement.update(body, options),
    destroy: (body) => Models.Announcement.destroy(body),
  })
);

module.exports = router;

const createNotificationsForLectureVideo = async (lectureId) => {
  let students = await Models.Student.findAll({
    include: {
      model: Models.Order,
      as: "orders",
      required: true,
      attributes: [],
      where: { status: OrderStatusTypes.CONFIRMED },
      include: {
        model: Models.OrderItem,
        as: "orderItems",
        attributes: [],
        required: true,
        where: { type: CourseGroupTypes.ONLINE },
        include: {
          model: Models.CourseGroupSession,
          as: "courseGroupSession",
          attributes: [],
          required: true,
          where: {
            lectureId,
          },
          include: {
            model: Models.Lecture,
            as: "lecture",
            attributes: [],
            required: true,
            include: {
              model: Models.Course,
              as: "course",
              attributes: [],
              required: true,
              include: [
                {
                  model: Models.Subject,
                  as: "subject",
                  attributes: [],
                  required: true,
                },
                {
                  model: Models.Tutor,
                  as: "tutor",
                  attributes: [],
                  required: true,
                },
              ],
            },
          },
        },
      },
    },
    attributes: [
      [sequelize.fn("DISTINCT", sequelize.col("Student.id")), "id"],
      [
        sequelize.col("orders->orderItems.course_group_session_id"),
        "courseGroupSessionId",
      ],
      [
        sequelize.col("orders->orderItems->courseGroupSession->lecture.title"),
        "lectureTitle",
      ],
      [
        sequelize.col(
          "orders->orderItems->courseGroupSession->lecture->course->subject.name"
        ),
        "subjectName",
      ],
      [
        sequelize.col(
          "orders->orderItems->courseGroupSession->lecture->course->tutor.first_name"
        ),
        "tutorFirstName",
      ],
      [
        sequelize.col(
          "orders->orderItems->courseGroupSession->lecture->course->tutor.last_name"
        ),
        "tutorLastName",
      ],
      [sequelize.col("orders->orderItems->courseGroupSession.date"), "date"],
      [sequelize.col("orders->orderItems->courseGroupSession.from"), "from"],
    ],
    raw: true,
    nest: true,
  });

  const notificationsObject = students.map((el) => {
    const notification = {};
    notification.studentId = el.id;
    notification.type = NotificationTypes.LECTURE_VIDEO;
    notification.content = JSON.stringify({
      courseGroupSessionId: el.courseGroupSessionId,
      lectureTitle: el.lectureTitle,
      subjectName: el.subjectName,
      tutorName: el.tutorFirstName + " " + el.tutorLastName,
      date: el.date,
      from: el.from,
    });
    return notification;
  });

  Models.Notification.bulkCreate(notificationsObject).catch((err) =>
    console.error(err)
  );
};

const createNotificationsForLiveSession = async (
  courseGroupSessionId,
  date,
  from,
  meetingUrl
) => {
  let students = await Models.Student.findAll({
    include: {
      model: Models.Order,
      as: "orders",
      required: true,
      attributes: [],
      where: { status: OrderStatusTypes.CONFIRMED },
      include: {
        model: Models.OrderItem,
        as: "orderItems",
        attributes: [],
        required: true,
        where: { type: CourseGroupTypes.ONLINE, courseGroupSessionId },
        include: {
          model: Models.CourseGroupSession,
          as: "courseGroupSession",
          attributes: [],
          required: true,
          include: {
            model: Models.Lecture,
            as: "lecture",
            attributes: [],
            required: true,
            include: {
              model: Models.Course,
              as: "course",
              attributes: [],
              required: true,
              include: [
                {
                  model: Models.Subject,
                  as: "subject",
                  attributes: [],
                  required: true,
                },
                {
                  model: Models.Tutor,
                  as: "tutor",
                  attributes: [],
                  required: true,
                },
              ],
            },
          },
        },
      },
    },
    attributes: [
      [sequelize.fn("DISTINCT", sequelize.col("Student.id")), "id"],
      [
        sequelize.col("orders->orderItems->courseGroupSession->lecture.title"),
        "lectureTitle",
      ],
      [
        sequelize.col(
          "orders->orderItems->courseGroupSession->lecture->course->subject.name"
        ),
        "subjectName",
      ],
      [
        sequelize.col(
          "orders->orderItems->courseGroupSession->lecture->course->tutor.first_name"
        ),
        "tutorFirstName",
      ],
      [
        sequelize.col(
          "orders->orderItems->courseGroupSession->lecture->course->tutor.last_name"
        ),
        "tutorLastName",
      ],
    ],
    raw: true,
    nest: true,
  });

  const notificationsObject = students.map((el) => {
    const notification = {};
    notification.studentId = el.id;
    notification.type = NotificationTypes.LIVE_MEETING;
    notification.content = JSON.stringify({
      courseGroupSessionId,
      date,
      from,
      lectureTitle: el.lectureTitle,
      subjectName: el.subjectName,
      tutorName: el.tutorFirstName + " " + el.tutorLastName,
      meetingUrl,
    });
    return notification;
  });

  Models.Notification.bulkCreate(notificationsObject).catch((err) =>
    console.error(err)
  );
};

const createNotificationsForAnnouncement = async (courseId, title, content) => {
  let students = await Models.Student.findAll({
    include: {
      model: Models.Attendance,
      as: "attendances",
      required: true,
      attributes: [],
      include: {
        model: Models.CourseGroupSession,
        as: "courseGroupSession",
        attributes: [],
        required: true,
        include: {
          model: Models.CourseGroup,
          as: "courseGroup",
          attributes: [],
          required: true,
          where: {
            courseId,
          },
        },
      },
    },
    attributes: [[sequelize.fn("DISTINCT", sequelize.col("Student.id")), "id"]],
    raw: true,
    nest: true,
  });

  const notificationsObject = students.map((el) => {
    const notification = {};
    notification.studentId = el.id;
    notification.type = NotificationTypes.ANNOUNCEMENT;
    notification.content = JSON.stringify({
      title,
      content,
    });
    return notification;
  });

  Models.Notification.bulkCreate(notificationsObject).catch((err) =>
    console.error(err)
  );
};

const { sequelize } = require("../../utils/database");
const Sequelize = require("sequelize");
const {
  Quiz,
  QuizAnswer,
  QuizSession,
  Lecture,
  Course,
  Subject,
  Student,
  Tutor,
  Attendance,
  CourseGroupSession,
} = require("../../models");
const catchAsync = require("../../utils/catchAsync");
const createPaginationObject = require("../../utils/createPaginationObject");
const { UserRoles } = require("../../enums");
const awsS3 = require("../../services/aws_s3");
const { awsBucketUrl } = require("../../utils/constants");
const AppError = require("../../utils/appError");

const getQuizzesByLectureIds = async ({
  lectureIds,
  page,
  limit,
  type,
  userId,
}) => {
  const offset = (page - 1) * limit;

  const isTutor = type === UserRoles.TUTOR;
  const isStudent = type === UserRoles.STUDENT;

  let orderObject;

  if (isTutor) {
    orderObject = [["createdAt", "DESC"]];
  } else if (isStudent) {
    orderObject = [
      [{ model: QuizSession, as: "quizSessions" }, "from", "DESC"],
    ];
  }

  let { count, rows } = await Quiz.findAndCountAll({
    attributes: [
      "id",
      "type",
      [sequelize.col("lecture->course->subject.name"), "subjectName"],
      [sequelize.col("lecture->course.grade"), "grade"],
      "questions",
      "name",
      [sequelize.col("lecture->course.education"), "education"],
      "duration",
      "showAnswers",
    ],
    include: [
      {
        model: Lecture,
        as: "lecture",
        attributes: ["id", "title"],
        required: true,
        include: {
          model: Course,
          as: "course",
          attributes: [],
          required: true,
          include: {
            model: Subject,
            as: "subject",
            attributes: [],
            required: true,
          },
        },
        where: {
          id: lectureIds,
        },
      },
      {
        model: QuizSession,
        as: "quizSessions",
        attributes: ["id", "from", "to"],
        ...(isStudent && {
          include: {
            required: false,
            model: QuizAnswer,
            as: "quizAnswers",
            attributes: ["correctCount", "createdAt"],
            where: {
              studentId: userId,
            },
          },
        }),
      },
    ],
    distinct: true,
    subQuery: false,
    offset: offset,
    limit: limit,
    order: orderObject,
  });

  rows = rows.map((el) => {
    el = el.toJSON();

    if (el.quizSessions && el.quizSessions.length > 0) {
      el.from = el.quizSessions[0].from;
      el.to = el.quizSessions[0].to;
    }

    return el;
  });

  if (isTutor) {
    rows = rows.map((el) => {
      el["questionsCount"] = el.questions.length;
      el.questions = undefined;
      el.quizSessions = undefined;

      return el;
    });
  } else if (isStudent) {
    rows = rows.map((quiz) => {
      let viewed = false,
        submitted = false,
        grade = null,
        canSubmit = false;

      quiz.quizSessions.forEach((session) => {
        const correctCount = session.quizAnswers
          ? session.quizAnswers.correctCount
          : undefined;

        sessionViewed = correctCount !== undefined ? true : false;
        sessionSubmitted =
          correctCount !== null && correctCount >= 0 ? true : false;
        if (grade === null)
          grade = correctCount !== undefined ? correctCount : null;

        const timeNow = Date.now();
        const fromTime = new Date(session.from);

        const sessionCanSubmit =
          (!sessionViewed ||
            (sessionViewed &&
              !sessionSubmitted &&
              canSubmitAnswerNow({ quizAnswer: session.quizAnswers, quiz }))) &&
          timeNow > fromTime;

        if (!viewed) canSubmit = sessionCanSubmit;

        viewed |= sessionViewed;
        submitted |= sessionSubmitted;
      });

      quiz["questionsCount"] = quiz.questions.length;
      quiz.correctAnswersCount = -1;

      for (session of quiz.quizSessions) {
        if (session.quizAnswers && session.quizAnswers.correctCount >= 0)
          quiz.correctAnswersCount = session.quizAnswers.correctCount;

        session.quizAnswers = undefined;
      }

      quiz.viewed = viewed;
      quiz.submitted = submitted;
      quiz.grade = grade;
      quiz.canSubmit = canSubmit;
      quiz.quizSessions = undefined;

      quiz.questions = undefined;
      return quiz;
    });
  }

  const pagingObject = createPaginationObject(page, limit, count, rows);

  return pagingObject;
};

const getStudentQuizzes = async ({ studentId, page, limit }) => {
  let lectureIds = await Lecture.findAll({
    attributes: ["id"],
    include: {
      attributes: [],
      model: CourseGroupSession,
      as: "courseGroupSession",
      required: true,
      include: {
        attributes: [],
        model: Attendance,
        as: "attendances",
        required: true,
        where: {
          studentId,
        },
      },
    },
    raw: true,
  });

  lectureIds = lectureIds.map((el) => {
    el = el.id;
    return el;
  });

  const quizzes = await getQuizzesByLectureIds({
    lectureIds,
    page,
    limit,
    type: UserRoles.STUDENT,
    userId: studentId,
  });

  return quizzes;
};

const getTutorQuizzes = async ({ tutorId, page, limit }) => {
  let lectureIds = await Lecture.findAll({
    attributes: ["id"],
    include: {
      attributes: [],
      model: Course,
      as: "course",
      required: true,
      where: {
        tutorId,
      },
    },
    raw: true,
  });

  lectureIds = lectureIds.map((el) => {
    el = el.id;
    return el;
  });

  const quizzes = await getQuizzesByLectureIds({
    lectureIds,
    page,
    limit,
    type: UserRoles.TUTOR,
  });

  return quizzes;
};

/**
 * getQuizzes
 * URL: /quizzes
 * Method: GET
 * Response: {quizzes: [{subject, grade, type, id}, ...]}
 */

exports.getQuizzes = catchAsync(async (req, res, next) => {
  let quizzes;

  switch (req.user.dataValues.role) {
    case UserRoles.TUTOR:
      quizzes = await getTutorQuizzes({
        tutorId: req.user.id,
        page: req.query.page * 1 || 1,
        limit: req.query.limit * 1 || 1000,
      });
      break;
    case UserRoles.STUDENT:
      quizzes = await getStudentQuizzes({
        studentId: req.user.id,
        page: req.query.page * 1 || 1,
        limit: req.query.limit * 1 || 1000,
      });
      break;
  }

  res.status(200).json(quizzes);
});

const getQuizStudent = async ({ quizId, userId }) => {
  let quiz = await Quiz.findByPk(quizId, {
    attributes: [
      "id",
      "type",
      [sequelize.col("lecture->course->subject.name"), "subjectName"],
      [sequelize.col("lecture->course.grade"), "grade"],
      "questions",
      "name",
      [sequelize.col("lecture->course.education"), "education"],
      "duration",
      "showAnswers",
    ],
    include: [
      {
        model: Lecture,
        as: "lecture",
        attributes: ["id", "title"],
        required: true,
        include: {
          model: Course,
          as: "course",
          attributes: [],
          required: true,
          include: {
            model: Subject,
            as: "subject",
            attributes: [],
            required: true,
          },
        },
      },
      {
        model: QuizSession,
        as: "quizSessions",
        attributes: ["id", "from", "to"],
        include: {
          required: false,
          model: QuizAnswer,
          as: "quizAnswers",
          attributes: ["correctCount", "createdAt"],
          where: {
            studentId: userId,
          },
        },
      },
    ],
    distinct: true,
    subQuery: false,
  });

  quiz = quiz.toJSON();
  if (quiz.quizSessions && quiz.quizSessions.length > 0) {
    quiz.from = quiz.quizSessions[0].from;
    quiz.to = quiz.quizSessions[0].to;
  }

  let viewed = false,
    submitted = false,
    grade = null,
    canSubmit = false,
    viewedTime = null;

  quiz.quizSessions.forEach((session) => {
    const correctCount = session.quizAnswers
      ? session.quizAnswers.correctCount
      : undefined;

    if (viewedTime === null && session.quizAnswers) {
      viewedTime = session.quizAnswers.createdAt;
    }

    sessionViewed = correctCount !== undefined ? true : false;
    sessionSubmitted =
      correctCount !== null && correctCount >= 0 ? true : false;
    if (grade === null)
      grade = correctCount !== undefined ? correctCount : null;

    const timeNow = Date.now();
    const fromTime = new Date(session.from);

    const sessionCanSubmit =
      (!sessionViewed ||
        (sessionViewed &&
          !sessionSubmitted &&
          canSubmitAnswerNow({ quizAnswer: session.quizAnswers, quiz }))) &&
      timeNow > fromTime;

    if (!viewed) canSubmit = sessionCanSubmit;

    viewed |= sessionViewed;
    submitted |= sessionSubmitted;
  });

  quiz["questionsCount"] = quiz.questions.length;
  quiz.correctAnswersCount = -1;

  for (session of quiz.quizSessions) {
    if (session.quizAnswers && session.quizAnswers.correctCount >= 0)
      quiz.correctAnswersCount = session.quizAnswers.correctCount;

    session.quizAnswers = undefined;
  }

  quiz.viewed = viewed;
  quiz.submitted = submitted;
  quiz.grade = grade;
  quiz.canSubmit = canSubmit;
  quiz.quizSessions = undefined;
  quiz.questions = undefined;
  quiz.viewedTime = viewedTime;

  return quiz;
};

const getQuizTutor = async ({ quizId }) => {
  let quiz = await Quiz.findByPk(quizId, {
    attributes: [
      "id",
      [sequelize.col("lecture->course->subject.name"), "subjectName"],
      [sequelize.col("lecture->course.grade"), "grade"],
      "questions",
      "name",
      "duration",
      "showAnswers",
    ],
    include: [
      {
        model: Lecture,
        as: "lecture",
        attributes: ["id", "title"],
        required: true,
        include: {
          model: Course,
          as: "course",
          attributes: [],
          required: true,
          include: {
            model: Subject,
            as: "subject",
            attributes: [],
            required: true,
          },
        },
      },
      {
        model: QuizSession,
        as: "quizSessions",
        attributes: ["id", "from", "to"],
      },
    ],
  });

  quiz = quiz.toJSON();

  if (quiz.quizSessions && quiz.quizSessions.length > 0) {
    quiz.from = quiz.quizSessions[0].from;
    quiz.to = quiz.quizSessions[0].to;
    quiz.quizSessions = undefined;
  }

  quiz.questions.forEach((question) => {
    if (question.hasImage) {
      question.image = `${awsBucketUrl}/quizzes/${encodeURIComponent(
        quiz.id
      )}/images/${question.id}?${Date.now()}_`;
    }
  });

  return quiz;
};

exports.getQuiz = catchAsync(async (req, res, next) => {
  const role = req.user.dataValues.role;
  const userId = req.user.id;
  const { quizId } = req.params;
  let quiz;
  switch (role) {
    case UserRoles.STUDENT:
      quiz = await getQuizStudent({ quizId, userId });
      break;
    case UserRoles.TUTOR:
      quiz = await getQuizTutor({ quizId });
      break;
    default:
      break;
  }

  res.status(200).json(quiz);
});

exports.addLectureQuiz = catchAsync(async (req, res, next) => {
  const { lectureId } = req.params;

  const questionsWithIds = [...req.body.questions];

  req.body.questions = questionsWithIds.map((question) => {
    const { image, ...rest } = question;
    if (image) rest.hasImage = 1;
    return rest;
  });

  req.body.quizSessions = [
    {
      from: req.body.from,
      to: req.body.to,
    },
  ];
  req.body.lectureId = lectureId;
  req.body.questions = JSON.stringify(req.body.questions);

  const quiz = await Quiz.create(req.body, {
    fields: [
      "type",
      "questions",
      "lectureId",
      "name",
      "duration",
      "showAnswers",
    ],
    include: {
      model: QuizSession,
      as: "quizSessions",
    },
  });
  await Promise.all(
    questionsWithIds.map((question) => {
      if (question.image) {
        return awsS3.uploadImage({
          imageBase64: question.image,
          imageId: `quizzes/${encodeURIComponent(quiz.id)}/images/${
            question.id
          }`,
        });
      }
    })
  );

  res.status(201).end();
});

/**
 * answerQuiz
 * URL: /quizzes/{quizId}/answer
 * Method: POST
 * Body: {answers: [q1AnswerIdx, q2AnswerIdx, …..........]}
 * Response: OK
 */

const canSubmitAnswerNow = ({ quiz, quizAnswer }) => {
  const timeNow = Date.now();

  const viewingTime = new Date(quizAnswer.createdAt);
  const viewingTimePlusDuration = new Date(
    viewingTime.getTime() + (quiz.duration + 2) * 60 * 1000
  );

  const canSubmit =
    viewingTime.getTime() < timeNow &&
    viewingTimePlusDuration.getTime() > timeNow
      ? true
      : false;

  return canSubmit;
};

const checkPreviousAnswers = async ({ quizAnswer }) => {
  const canSubmit =
    quizAnswer && quizAnswer.correctCount !== null ? false : true; // quizAnswer exists and correctCount not null

  return canSubmit;
};

const getAnswersResult = async ({ quiz, answers }) => {
  const questionsAndAnswers = [];
  let correctCount = 0;

  for (let i = 0; i < quiz.questions.length; i++) {
    const obj = {};
    obj.correct = quiz.questions[i].correctAnswerIdx;
    obj.answered = answers[i];
    if (obj.correct === obj.answered) correctCount++;

    questionsAndAnswers.push(obj);
  }

  return {
    questionsAndAnswers,
    correctCount,
    totalCount: quiz.questions.length,
  };
};

exports.answerQuiz = catchAsync(async (req, res, next) => {
  const { quizId } = req.params;
  const studentId = req.user.id;

  const quiz = await Quiz.findByPk(quizId, {
    include: {
      model: QuizSession,
      as: "quizSessions",
      include: {
        model: QuizAnswer,
        as: "quizAnswers",
        where: {
          studentId,
        },
        required: false,
      },
    },
  });

  const quizSession = quiz.quizSessions[0];

  const quizAnswer = quizSession.quizAnswers;

  if (!quizAnswer)
    throw new AppError(
      "You need to view the quiz questions first before submitting",
      400
    );

  // Check if time is correct

  const canSubmit = await canSubmitAnswerNow({ quiz, quizSession, quizAnswer });
  if (!canSubmit) throw new AppError("You can no longer answer this quiz", 400);

  // Check if student can submit the answer (not submitted previously)

  const canSubmitNewAnswer = await checkPreviousAnswers({
    quizAnswer,
  });

  if (!canSubmitNewAnswer)
    throw new AppError("You cannot submit a new answer to this quiz", 400);

  // Create the quiz answer

  quizAnswer.answers = JSON.stringify(req.body.answers);

  const answersResult = await getAnswersResult({
    quiz,
    answers: req.body.answers,
  });

  const correctCount = answersResult.correctCount;

  quizAnswer.correctCount = correctCount;

  await quizAnswer.save();

  res.status(201).json(answersResult);
});

exports.patchQuiz = catchAsync(async (req, res, next) => {
  const { quizId } = req.params;

  const { lectureId } = req.body;
  if (lectureId) {
    const lecture = await Lecture.findByPk(lectureId);
    if (!lecture) throw new AppError("There is no lecture with this id", 404);

    if (lecture.tutorId !== req.user.id)
      throw new AppError(
        "You are not the tutor of the lecture provided, therefore you cannot patch this quiz to that lecture",
        400
      );
  }

  let imagesToUpload = [];
  let imagesToDelete = [];
  let questionsIds = [];

  if (req.body.questions) {
    req.body.questions = req.body.questions.map((question) => {
      const { image, ...rest } = question;
      questionsIds.push(rest.id);
      if (image) {
        if (!image.trim().startsWith(awsBucketUrl)) {
          rest.hasImage = 1;
          imagesToUpload.push({
            base64: image,
            id: `quizzes/${encodeURIComponent(quizId)}/images/${rest.id}`,
          });
        }
      } else {
        if (rest.hasImage) {
          rest.hasImage = 0;
          imagesToDelete.push(rest.id);
        }
      }
      return rest;
    });

    req.body.questions = JSON.stringify(req.body.questions);
  }

  await sequelize.transaction(async (t) => {
    await Quiz.update(req.body, {
      where: {
        id: quizId,
      },
      fields: [
        "name",
        "questions",
        "type",
        "lectureId",
        "duration",
        "showAnswers",
      ],
      transaction: t,
    });

    if (req.body.from || req.body.to) {
      await QuizSession.update(
        {
          from: req.body.from,
          to: req.body.to,
        },
        {
          where: {
            quizId,
          },
          fields: ["from", "to"],
          transaction: t,
        }
      );
    }
  });

  if (req.body.questions) {
    const quizImages = await awsS3.getAlbumFiles(
      `quizzes/${encodeURIComponent(quizId)}/images`
    );

    if (quizImages.length) {
      quizImages.forEach((quizImage) => {
        if (questionsIds.indexOf(quizImage) === -1) {
          imagesToDelete.push(quizImage);
        }
      });
    }

    let uploadImagesPromises = [];
    let deleteImagesPromises = [];

    if (imagesToUpload.length) {
      uploadImagesPromises = imagesToUpload.map((image) => {
        awsS3.uploadImage({
          imageBase64: image.base64,
          imageId: image.id,
        });
      });
    }

    if (imagesToDelete.length) {
      deleteImagesPromises.push(
        awsS3.deleteImagesFromAlbum(
          imagesToDelete.map((imageToDelete) => ({
            Key: `quizzes/${encodeURIComponent(
              quizId
            )}/images/${imageToDelete}`,
          }))
        )
      );
    }

    await Promise.all([...uploadImagesPromises, ...deleteImagesPromises]);
  }

  res.status(204).send();
});

exports.deleteQuiz = catchAsync(async (req, res, next) => {
  const { quizId } = req.params;

  const destroyed = await Quiz.destroy({
    where: {
      id: quizId,
    },
  });

  if (destroyed === 0)
    throw new AppError("No quiz was found with that id", 404);

  const quizImages = await awsS3.getAlbumFiles(
    `quizzes/${encodeURIComponent(quizId)}/images`
  );

  if (quizImages.length) {
    await awsS3.deleteImagesFromAlbum(
      quizImages.map((quizImage) => ({
        Key: `quizzes/${encodeURIComponent(quizId)}/images/${quizImage}`,
      }))
    );
  }

  res.status(204).send();
});

exports.addQuizSession = catchAsync(async (req, res, next) => {
  const { quizId } = req.params;

  const quizSessionObject = {
    quizId,
    ...req.body,
  };

  await QuizSession.create(quizSessionObject, {
    fields: ["quizId", "from", "to"],
    validate: true,
  });

  res.status(201).send();
});

exports.deleteQuizSession = catchAsync(async (req, res, next) => {
  const { quizSessionId } = req.params;

  const destroyed = await QuizSession.destroy({
    where: {
      id: quizSessionId,
    },
  });

  if (destroyed === 0)
    throw new AppError("No quiz session was found with that id", 404);

  res.status(204).send();
});

exports.patchQuizSession = catchAsync(async (req, res, next) => {
  const { quizSessionId } = req.params;

  await QuizSession.update(req.body, {
    where: {
      id: quizSessionId,
    },
    fields: ["from", "to"],
  });

  res.status(204).send();
});

exports.getQuizStudents = catchAsync(async (req, res, next) => {
  const { quizId } = req.params;
  const search = req.query.search;
  const filter = req.query.filter;
  const sort = req.query.sort;
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 1000;

  const offset = (page - 1) * limit;

  let filterObj;

  switch (filter) {
    case "passed":
      filterObj = [
        Sequelize.literal(
          `\`Student\`.\`id\` IN (SELECT \`student_id\` FROM \`quiz_answer\` INNER JOIN \`quiz_session\` ON \`quiz_answer\`.\`quiz_session_id\` = \`quiz_session\`.\`id\` WHERE \`quiz_session\`.\`quiz_id\` = ${quizId} AND \`correct_count\` > 0.5 * (SELECT JSON_LENGTH(\`questions\`) FROM \`quiz\` WHERE \`quiz\`.\`id\` = ${quizId}))`
        ),
      ];
      break;
    case "failed":
      filterObj = [
        Sequelize.literal(
          `\`Student\`.\`id\` NOT IN (SELECT \`student_id\` FROM \`quiz_answer\` INNER JOIN \`quiz_session\` ON \`quiz_answer\`.\`quiz_session_id\` = \`quiz_session\`.\`id\` WHERE \`quiz_session\`.\`quiz_id\` = ${quizId} AND \`correct_count\` > 0.5 * (SELECT JSON_LENGTH(\`questions\`) FROM \`quiz\` WHERE \`quiz\`.\`id\` = ${quizId}))`
        ),
      ];

      break;
    case "onDate":
      filterObj = [
        Sequelize.literal(
          `\`Student\`.\`id\` IN (SELECT \`student_id\` FROM \`quiz_answer\` INNER JOIN \`quiz_session\` ON \`quiz_session\`.\`id\` = \`quiz_answer\`.\`quiz_session_id\` WHERE \`quiz_id\` = ${quizId}  AND \`quiz_answer\`.\`created_at\` < \`quiz_session\`.\`to\`)`
        ),
      ];
      break;
    case "late":
      filterObj = [
        Sequelize.literal(
          `\`Student\`.\`id\` NOT IN (SELECT \`student_id\` FROM \`quiz_answer\` INNER JOIN \`quiz_session\` ON \`quiz_session\`.\`id\` = \`quiz_answer\`.\`quiz_session_id\` WHERE \`quiz_id\` = ${quizId}  AND \`quiz_answer\`.\`created_at\` < \`quiz_session\`.\`to\`)`
        ),
      ];
      break;
    default:
      break;
  }

  let orderObject;
  let orderingByGrade = false;

  switch (sort) {
    case "nameASC":
      orderObject = [
        [
          Sequelize.fn(
            "concat",
            Sequelize.col("Student.first_name", "Student.last_name")
          ),
          "ASC",
        ],
      ];
      break;
    case "nameDESC":
      orderObject = [
        [
          Sequelize.fn(
            "concat",
            Sequelize.col("Student.first_name", "Student.last_name")
          ),
          "DESC",
        ],
      ];
      break;
    case "gradeASC": {
      orderObject = [[Sequelize.col("correctCount"), "ASC"]];
      orderingByGrade = true;
      break;
    }
    case "gradeDESC": {
      orderObject = [[Sequelize.col("correctCount"), "DESC"]];
      orderingByGrade = true;
      break;
    }
    default:
      break;
  }

  const { count, rows } = await Student.findAndCountAll({
    attributes: [
      "id",
      "firstName",
      "lastName",
      "hasImage",
      [
        "(SELECT MAX(`correct_count`) FROM `quiz_answer` INNER JOIN `quiz_session` ON `quiz_session`.`id` = `quiz_answer`.`quiz_session_id` WHERE `student_id` = `Student`.`id` AND `quiz_session`.`quiz_id` = `attendances->courseGroupSession->lecture->quiz`.`id`)",
        "correctCount",
      ],
    ],
    include: {
      attributes: [],
      model: Attendance,
      as: "attendances",
      required: true,
      include: {
        attributes: [],
        model: CourseGroupSession,
        as: "courseGroupSession",
        required: true,
        include: {
          attributes: [],
          model: Lecture,
          as: "lecture",
          required: true,
          include: {
            attributes: [],
            model: Quiz,
            as: "quiz",
            required: true,
            where: {
              id: quizId,
            },
          },
        },
      },
    },
    where: {
      [Sequelize.Op.and]: [
        ...(search
          ? [
              Sequelize.where(
                Sequelize.fn(
                  "concat",
                  Sequelize.col("Student.first_name"),
                  " ",
                  Sequelize.col("Student.last_name")
                ),
                {
                  [Sequelize.Op.like]: `%${search}%`,
                }
              ),
            ]
          : []),
        ...(filter ? filterObj : []),
      ],
    },
    ...(orderObject && { order: orderObject }),
    offset: offset,
    limit: limit,
    subQuery: false,
  });

  const enrolledStudentsIds = rows.map((el) => {
    el = el.id;
    return el;
  });

  const studentsAnswersArray = await QuizAnswer.findAll({
    include: {
      model: QuizSession,
      as: "quizSession",
      required: true,
      where: {
        quizId,
      },
    },
    where: {
      studentId: enrolledStudentsIds,
    },
    raw: true,
    nest: true,
  });

  studentsAnswersMap = studentsAnswersArray.reduce((obj, el) => {
    obj[el.studentId] = el;
    return obj;
  }, {});

  enrolledStudentsWithAnswers = rows.map((student) => {
    student = student.toJSON();
    const thisStudentAnswer = studentsAnswersMap[student.id];

    const correctCount = thisStudentAnswer
      ? thisStudentAnswer.correctCount
      : undefined;

    student.viewed = correctCount !== undefined ? true : false;
    student.submitted =
      correctCount !== null && correctCount >= 0 ? true : false;

    student.grade = correctCount !== undefined ? correctCount : null;

    return student;
  });

  const pagingObject = createPaginationObject(
    page,
    limit,
    count,
    enrolledStudentsWithAnswers
  );

  res.status(200).json(pagingObject);
});

const getStudentQuizAnswers = async ({ quizId, studentId }) => {
  const quizAnswer = await QuizAnswer.findOne({
    include: [
      {
        model: QuizSession,
        as: "quizSession",
        where: {
          quizId,
        },
        required: true,
        include: {
          model: Quiz,
          as: "quiz",
          required: true,
        },
      },
      {
        model: Student,
        as: "student",
        attributes: ["id", "firstName", "lastName"],
      },
    ],
    where: {
      studentId,
    },
  });

  if (!quizAnswer)
    throw new AppError("There is no answer for this student to this quiz", 404);

  const questionsAndAnswers = [];

  quizAnswer.answers.forEach((answer, idx) => {
    const qna = {};
    const question = quizAnswer.quizSession.quiz.questions[idx];
    qna.questionText = question.questionText;
    qna.correctText = question.choices[question.correctAnswerIdx];
    qna.answerText = answer === -1 ? "" : question.choices[answer];
    qna.correct = question.correctAnswerIdx === answer ? true : false;
    qna.image = question.hasImage
      ? `${awsBucketUrl}/quizzes/${encodeURIComponent(quizId)}/images/${
          question.id
        }?${Date.now()}_`
      : null;
    questionsAndAnswers.push(qna);
  });

  const responseObject = {
    student: quizAnswer.student,
    correctCount: quizAnswer.correctCount,
    questionsCount: quizAnswer.quizSession.quiz.questions.length,
    questionsAndAnswers,
  };

  return responseObject;
};

exports.getStudentQuizAnswers = catchAsync(async (req, res, next) => {
  const { quizId, studentId } = req.params;

  const responseObject = await getStudentQuizAnswers({ quizId, studentId });

  res.status(200).json(responseObject);
});

const submitEmptyQuizAnswer = async ({
  quizSessionId,
  studentId,
  questions,
}) => {
  const answers = [];
  for (let i = 0; i < questions.length; i++) answers.push(-1);
  answersJSON = JSON.stringify(answers);

  await QuizAnswer.create({
    studentId,
    quizSessionId,
    answers: answersJSON,
  });
};

const checkIfStudentViewedSession = async ({ studentId, quizId }) => {
  const quizAnswer = await QuizAnswer.findOne({
    include: {
      model: QuizSession,
      as: "quizSession",
      required: true,
      where: {
        quizId,
      },
    },
    where: {
      studentId,
    },
  });

  const viewedBefore = quizAnswer ? true : false;

  return viewedBefore;
};

exports.getQuizQuestions = catchAsync(async (req, res, next) => {
  const { quizId } = req.params;
  const studentId = req.user.id;

  let quiz = await Quiz.findOne({
    include: {
      model: QuizSession,
      as: "quizSessions",
      attributes: ["id", "from", "to"],
    },
    attributes: ["id", "lectureId", "type", "questions"],
    where: {
      id: quizId,
    },
  });

  quiz = quiz.toJSON();

  const quizSessionId = quiz.quizSessions[0].id;

  if (quiz.quizSessions && quiz.quizSessions.length > 0) {
    quiz.from = quiz.quizSessions[0].from;
    quiz.to = quiz.quizSessions[0].to;
    quiz.quizSessions = undefined;
  }

  const timeNow = Date.now();
  const fromQuizTime = new Date(quiz.from);
  const toQuizTime = new Date(quiz.to);

  if (!(fromQuizTime < timeNow)) {
    throw new AppError("You cannot view the quiz questions now", 400);
  }

  const viewedBefore = await checkIfStudentViewedSession({
    studentId,
    quizId,
  });

  if (!viewedBefore) {
    submitEmptyQuizAnswer({
      quizSessionId,
      studentId,
      questions: quiz.questions,
    });
  }

  quiz.questions.map((question) => {
    question.correctAnswerIdx = undefined;
    question.image = question.hasImage
      ? `${awsBucketUrl}/quizzes/${encodeURIComponent(quiz.id)}/images/${
          question.id
        }?${Date.now()}_`
      : null;

    return question;
  });

  res.status(200).json(quiz);
});

exports.getQuizQuestionsAndAnswers = catchAsync(async (req, res, next) => {
  const { quizId } = req.params;
  const studentId = req.user.id;

  const responseObject = await getStudentQuizAnswers({ quizId, studentId });

  res.status(200).json(responseObject);
});

exports.retakeQuiz = catchAsync(async (req, res, next) => {
  const { quizSessionId, studentId } = req.query;

  const destroyed = await QuizAnswer.destroy({
    where: {
      quizSessionId,
      studentId,
    },
  });

  if (destroyed === 0)
    throw new AppError("No quiz answer was found with these ids", 404);

  res.status(204).send();
});

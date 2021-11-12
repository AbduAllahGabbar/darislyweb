import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API_HOST}/`,
  withCredentials: true,
});

const signInStudent = (signInInfo, lang) =>
  axiosInstance.post(`auth/${lang}/signinstudent`, signInInfo);

const signInTutor = (signInInfo, lang) =>
  axiosInstance.post(`auth/${lang}/signintutor`, signInInfo);

const signInStaff = (signInInfo, lang) =>
  axiosInstance.post(`auth/${lang}/signinstaff`, signInInfo);

const signUpStudent = (signUpInfo, lang) =>
  axiosInstance.post(`auth/${lang}/signupstudent`, signUpInfo);

const fetchUser = () => axiosInstance.get("auth/current_user");

const verifyPhone = (code) => axiosInstance.post(`auth/phone/verify`, code);

const getStudentStats = () => axiosInstance.get(`students/stats`);

const getStudentCourses = () => axiosInstance.get(`students/courses`);

const forgotPassword = (forgotPasswordInfo, lang) =>
  axiosInstance.put(`auth/${lang}/forgotpassword`, forgotPasswordInfo);

const resetPassword = (resetPasswordInfo) =>
  axiosInstance.put(`auth/resetpassword`, resetPasswordInfo);

const checkResetPassword = (checkResetPasswordInfo) =>
  axiosInstance.get(`auth/checkresetpassword`, {
    params: checkResetPasswordInfo,
  });

const getStudentSessions = () => axiosInstance.get("students/calendarsessions");

const getCourses = () => axiosInstance.get("courses");

const getCourse = (courseId) => axiosInstance.get(`courses/${courseId}`);

const getCourseData = (courseId) =>
  axiosInstance.get(`courses/${courseId}/coursebuilder`);

const updateCourse = (courseId, courseInfo) =>
  axiosInstance.patch(`courses/${courseId}/coursebuilder`, courseInfo);

const createCourse = (course) => axiosInstance.post(`courses/`, course);

const getSubjects = () => axiosInstance.get("subjects");

const getCenters = () => axiosInstance.get("centers");
const getTutorStats = () => axiosInstance.get("tutors/stats");

const getCenterOrders = (page, limit, search) =>
  axiosInstance.get(
    `staff/orders?page=${page}&limit=${limit}&search=${search}`
  );

const getCenterGroups = () => axiosInstance.get("staff/coursegroups");

const getCenterGroupStudents = (groupId) =>
  axiosInstance.get(`staff/coursegroups/${groupId}/students`);
const getCitiesWithAreas = () => axiosInstance.get(`cities`);

const updateStudentSettings = (updateStudentSettingsInfo) =>
  axiosInstance.patch(`students/settings`, updateStudentSettingsInfo);

const updateTutorSettings = (updateTutorSettingsInfo) =>
  axiosInstance.patch(`tutors/settings`, updateTutorSettingsInfo);

const changePassword = (route, changePasswordInfo) =>
  axiosInstance.patch(`${route}/changepassword`, changePasswordInfo);

const getCourseGroups = (courseId, type) =>
  axiosInstance.get(`courses/${courseId}/groups?type=${type}`);

const getCourseGroupSession = (courseGroupId) =>
  axiosInstance.get(`coursegroups/${courseGroupId}/lectures`);

const createOrder = (courseGroupSessions, type, centerId) =>
  axiosInstance.post(`orders/`, { courseGroupSessions, type, centerId });

const checkResendPhoneVerification = () =>
  axiosInstance.get(`auth/phone/checkresend`);

const checkResendEmailConfirmation = () =>
  axiosInstance.get(`auth/email/checkresend`);
const resendPhoneVerification = () =>
  axiosInstance.get(`auth/phone/resendverification`);

const resendEmailConfirmation = () =>
  axiosInstance.get(`auth/email/resendconfirmation`);

const getStudentOrders = () => axiosInstance.get(`orders`);

const getStudentOrderItems = (orderId) =>
  axiosInstance.get(`orders/${orderId}`);

const getTutorCourses = (tutorId) =>
  axiosInstance.get(`tutors/${tutorId}/courses`);

const getCourseStudents = (courseId, page, limit) =>
  axiosInstance.get(`courses/${courseId}/students?page=${page}&limit=${limit}`);

const putOrderStatus = (orderId, status, type, discount) =>
  axiosInstance.put(`orders/${orderId}/status`, { status, type, discount });

const contactUs = (email, name, message) =>
  axiosInstance.post(`admin/contactus`, { email, name, message });

const getCenterGroupSessions = (groupId, to) =>
  axiosInstance.get(
    `staff/coursegroups/${groupId}/sessions?from=2020-08-25T18:00:00&to=${to}`
  );

const getCenterSessionAttendance = (sessionId) =>
  axiosInstance.get(`staff/coursegroups/${sessionId}/attendance`);

const updateCenterAttendance = (sessionId, attendance) =>
  axiosInstance.put(`staff/sessions/${sessionId}/attendance`, { attendance });

const setLanguage = (lang) =>
  axiosInstance.get(`auth/setlanguage?lang=${lang}`);

const getNotifications = () => axiosInstance.get("notifications");

const readNotifications = (notifications) =>
  axiosInstance.post(`notifications/read`, { notifications });
const getAllCenters = () => axiosInstance.get(`centers`);

const getTutorSessions = (to) =>
  axiosInstance.get(`tutors/sessions?from=2020-08-25T16:00:00
`);

const getTutorSessionAttendance = (sessionId) =>
  axiosInstance.get(`coursegroups/${sessionId}/attendance?
`);

const updateTutorAttendance = (sessionId, attendance) =>
  axiosInstance.put(`sessions/${sessionId}/attendance`, { attendance });

const getSessionDetails = (sessionId) =>
  axiosInstance.get(`sessions/${sessionId}`);

const getCourseLectures = (courseId) =>
  axiosInstance.get(`courses/${courseId}/lectures`);

const addQuiz = (body, lectureId) =>
  axiosInstance.post(`lectures/${lectureId}/quizzes`, body);

const getQuizzes = () => axiosInstance.get(`quizzes`);

const getQuiz = (quizId) => axiosInstance.get(`quizzes/${quizId}`);

const getQuizQuestions = (quizId) =>
  axiosInstance.get(`quizzes/${quizId}/questions`);

const answerQuiz = (answers, quizId) =>
  axiosInstance.post(`quizzes/${quizId}/answer`, answers);

const deleteQuiz = (quizId) => axiosInstance.delete(`quizzes/${quizId}`);

const updateQuiz = (quizId, body) =>
  axiosInstance.patch(`quizzes/${quizId}`, body);

const getQuizStudents = (quizId, page, limit, search, filter, sort = null) => {
  let url =
    `quizzes/${quizId}/students?page=${page}&limit=${limit}` +
    (search ? `&search=${search}` : "") +
    (sort ? `&sort=${sort}` : "") +
    (filter && filter !== "" ? `&filter=${filter}` : "");

  return axiosInstance.get(url);
};

const getStudentQuizAnswer = (quizId, studetnId) =>
  axiosInstance.get(`quizzes/${quizId}/students/${studetnId}/answers`);

const createAnnouncement = (courseId, title, content) =>
  axiosInstance.post(`courses/${courseId}/announcements`, { title, content });

const scheduleSession = (sessionId) =>
  axiosInstance.post(`sessions/${sessionId}/schedule`);

const addStudentAttendance = (sessionId) =>
  axiosInstance.put(`students/sessions/${sessionId}/attendance`);

const getCartItems = () => axiosInstance.get("cartitems");

const addToCart = (productIds) =>
  axiosInstance.post("cartitems", { productIds });

const removeFromCart = (id) => axiosInstance.delete(`cartitems/${id}`);

const createOnlineOrder = () => axiosInstance.post(`orders/online`);

const getTaxes = () => axiosInstance.get("cartitems/tax");

const getCurrentStudentQuizAnswers = (quizId) =>
  axiosInstance.get(`quizzes/${quizId}/qna`);

const addLectureMaterial = async (body, lectureId) => {
  let formData = new FormData();
  formData.append("lectureId", lectureId);
  Object.keys(body).forEach((key) => {
    if (key === "files" && body[key].length > 0)
      body[key].forEach((file) => formData.append(`files`, file));
    else formData.append(key, body[key]);
  });
  return await axiosInstance.post(`lectures/${lectureId}/material`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const getLectureMaterial = (lectureId) =>
  axiosInstance.get(`lectures/${lectureId}/material`);

const deleteLectureMaterial = (materialId) =>
  axiosInstance.delete(`lectures/material/${materialId}`);

const getCourseMaterialLectures = (courseId) =>
  axiosInstance.get(`courses/${courseId}/material/lectures`);

const staffSetAttendance = (studentId, sessionId, attendance) => {
  let body = {
    attendance: [
      {
        studentId: studentId,
        attended: attendance,
      },
    ],
  };
  return axiosInstance.put(`staff/sessions/${sessionId}/attendance`, body);
};

const getStudentCourseLectures = (studentId, courseId, orderId = undefined) =>
  axiosInstance.get(
    `courses/${courseId}/students/${studentId}/lectures?${
      orderId !== undefined ? `orderId=${orderId}` : ""
    }`
  );

const getLectureSessions = (lectureId) =>
  axiosInstance.get(`lectures/${lectureId}/sessions`);

const migrateOrderItem = (orderItemId, sessionId) =>
  axiosInstance.patch(`staff/orderitems/${orderItemId}`, {
    sessionId: sessionId,
  });

const retakeQuiz = (quizId, quizSessionId, studentId) =>
  axiosInstance.delete(
    `quizzes/${quizId}/retake?quizSessionId=${quizSessionId}&studentId=${studentId}`
  );

export default {
  signInStudent,
  signUpStudent,
  fetchUser,
  verifyPhone,
  getStudentStats,
  getStudentCourses,
  forgotPassword,
  resetPassword,
  checkResetPassword,
  getStudentSessions,
  getCourses,
  getCourse,
  signInTutor,
  signInStaff,
  createCourse,
  getSubjects,
  getCenters,
  getTutorStats,
  getCenterOrders,
  getCenterGroups,
  getCenterGroupStudents,
  getCitiesWithAreas,
  updateStudentSettings,
  updateTutorSettings,
  changePassword,
  getCourseGroups,
  getCourseGroupSession,
  createOrder,
  checkResendPhoneVerification,
  checkResendEmailConfirmation,
  resendPhoneVerification,
  resendEmailConfirmation,
  getStudentOrders,
  getStudentOrderItems,
  getTutorCourses,
  getCourseStudents,
  putOrderStatus,
  contactUs,
  getCenterGroupSessions,
  getCenterSessionAttendance,
  updateCenterAttendance,
  setLanguage,
  getNotifications,
  readNotifications,
  getAllCenters,
  getTutorSessions,
  getTutorSessionAttendance,
  updateTutorAttendance,
  getSessionDetails,
  getCourseLectures,
  addQuiz,
  getQuizzes,
  getQuiz,
  answerQuiz,
  deleteQuiz,
  updateQuiz,
  getQuizStudents,
  getStudentQuizAnswer,
  getQuizQuestions,
  createAnnouncement,
  scheduleSession,
  addStudentAttendance,
  getCartItems,
  addToCart,
  removeFromCart,
  createOnlineOrder,
  getTaxes,
  getCurrentStudentQuizAnswers,
  getCourseData,
  updateCourse,
  addLectureMaterial,
  getLectureMaterial,
  deleteLectureMaterial,
  getCourseMaterialLectures,
  staffSetAttendance,
  getStudentCourseLectures,
  getLectureSessions,
  migrateOrderItem,
  retakeQuiz,
};

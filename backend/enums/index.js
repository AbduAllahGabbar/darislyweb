exports.AuthProviderTypes = {
  GOOGLE: 0,
  FACEBOOK: 1,
  TWITTER: 2,
};

exports.UserRoles = {
  STUDENT: 0,
  TUTOR: 1,
  STAFF: 2,
  NOUSER: 3,
  ADMIN: 4,
};

exports.CourseGroupTypes = {
  ONLINE: 0,
  CENTER: 1,
  BOTH: 2,
};

exports.OrderTypes = {
  CASH: 0,
  CREDIT: 1,
  FAWRY_CASH: 2,
  FREE: 3,
};

exports.OrderStatusTypes = {
  UNCONFIRMED: 0,
  CONFIRMED: 1,
  EXPIRED: 2,
  RETURNED: 3,
  CANCELLED: 4,
  FAILED: 5,
};

exports.AttendanceTypes = {
  PRESENT: 0,
  LATE: 1,
  ABSENT: 2,
  EXCUSED: 3,
};

exports.NotificationTypes = {
  ANNOUNCEMENT: 0,
  LECTURE_VIDEO: 1,
  LIVE_MEETING: 2,
};

exports.OrderItemType = {
  ONLINE: 0,
  CENTER: 1,
};

exports.QuizTypes = {
  MCQ: 0,
  DOCUMENT: 1,
};

exports.ProductTypes = {
  SESSION: 0,
};

exports.FawryOrderStatus = {
  NEW: "new",
  PAID: "paid",
  UNPAID: "unpaid",
  CANCELED: "canceled",
  DELIVERED: "delivered",
  REFUNDED: "refunded",
  EXPIRED: "expired",
  PARTIAL_REFUNDED: "partial_refunded",
  FAILED: "failed",
  FAILD: "faild",
};

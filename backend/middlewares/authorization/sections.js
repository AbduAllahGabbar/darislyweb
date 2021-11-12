const { Course, Section } = require("../../models");
const { UserRoles } = require("../../enums/index");
const AppError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");

const authTutorToOwnedSection = async (sectionId, tutorId) => {
  const section = await Section.findOne({
    include: {
      model: Course,
      as: "course",
      required: true,
      tutorId,
    },
    where: {
      id: sectionId,
    },
  });

  if (!section)
    throw new AppError("You do not have access to this section", 401);
};

exports.authorizeUserToSection = catchAsync(async (req, res, next) => {
  const { sectionId } = req.params;
  const userId = req.user.id;
  const role = req.user.dataValues.role;

  switch (role) {
    case UserRoles.TUTOR:
      await authTutorToOwnedSection(sectionId, userId);
      break;
    default:
      throw new AppError("Invalid user role for authorization", 500);
  }

  next();
});

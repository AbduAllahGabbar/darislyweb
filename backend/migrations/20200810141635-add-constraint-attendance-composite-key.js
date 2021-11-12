"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint("attendance", {
      fields: ["student_id", "course_group_session_id"],
      type: "primary key",
      name: "attendance_ibpk",
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint("attendance", "attendance_ibpk");
  },
};

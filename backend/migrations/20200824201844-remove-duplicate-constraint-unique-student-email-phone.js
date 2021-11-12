"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeConstraint("student", "email_2"),
        queryInterface.removeConstraint("student", "phone_2"),
      ]);
    });
  },

  down: (queryInterface, Sequelize) => {
    return Promise.resolve(true);
  },
};

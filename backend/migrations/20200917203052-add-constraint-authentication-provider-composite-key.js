"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(
        `ALTER TABLE authentication_provider DROP PRIMARY KEY, ADD PRIMARY KEY(id, student_id);`
      )
      .then(() => {
        console.log("Authentication Provider composite primary key added");
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(
        `ALTER TABLE authentication_provider DROP PRIMARY KEY, ADD PRIMARY KEY(id);`
      )
      .then(() => {
        console.log("Authentication Provider composite primary key removed");
      });
  },
};

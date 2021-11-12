"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(
        `CREATE EVENT expireStudent
        ON SCHEDULE AT CURRENT_TIMESTAMP + INTERVAL  1 DAY 
        DO
        DELETE FROM student WHERE email_verified = 0 AND phone_verified = 0 AND created_at < DATE_SUB(NOW(), INTERVAL 1 DAY);`
      )
      .then(() => {
        console.log("expireStudent event created");
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`DROP EVENT IF EXISTS  expireStudent`)
      .then(() => {
        console.log("expireStudent event dropped");
      });
  },
};

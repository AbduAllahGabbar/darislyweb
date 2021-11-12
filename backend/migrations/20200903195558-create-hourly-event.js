"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(
        `CREATE EVENT event_hourly
        ON SCHEDULE
	        EVERY 1 HOUR
	        COMMENT 'Hourly event'
        DO
        BEGIN
	        DELETE FROM email_verification WHERE created_at < DATE_SUB(NOW(), INTERVAL 1 DAY);
	        DELETE FROM student WHERE (email_verified = 0 OR phone_verified = 0) AND created_at < DATE_SUB(NOW(), INTERVAL 1 DAY);
          UPDATE \`order\` SET status = 2 WHERE status = 0 AND created_at < DATE_SUB(NOW(), INTERVAL 1 DAY);
        END;`
      )
      .then(() => {
        console.log("Hourly event created");
      });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize
      .query(`DROP EVENT IF EXISTS  event_hourly`)
      .then(() => {
        console.log("Hourly event dropped");
      });
  },
};

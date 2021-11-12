"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.sequelize.query(
      "UPDATE `quiz` SET `duration` = (SELECT TIMESTAMPDIFF(MINUTE, `quiz_session`.`from`, `quiz_session`.`to`) FROM `quiz_session` WHERE `quiz_id` = `quiz`.`id` LIMIT 1);"
    );
  },

  down: async (queryInterface, Sequelize) => {},
};

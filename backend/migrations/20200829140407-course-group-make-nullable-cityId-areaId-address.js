"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("course_group", "area_id", {
      type: Sequelize.INTEGER(10).UNSIGNED,
      allowNull: true,
    });

    await queryInterface.changeColumn("course_group", "city_id", {
      type: Sequelize.INTEGER(10).UNSIGNED,
      allowNull: true,
    });

    await queryInterface.changeColumn("course_group", "address", {
      type: Sequelize.STRING(50),
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("course_group", "area_id", {
      type: Sequelize.INTEGER(10).UNSIGNED,
      allowNull: false,
    });

    await queryInterface.changeColumn("course_group", "city_id", {
      type: Sequelize.INTEGER(10).UNSIGNED,
      allowNull: false,
    });

    await queryInterface.changeColumn("course_group", "address", {
      type: Sequelize.STRING(50),
      allowNull: false,
    });
  },
};

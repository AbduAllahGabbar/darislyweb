"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("course_group", {
      id: {
        type: Sequelize.INTEGER(10).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      courseId: {
        field: "course_id",
        allowNull: false,
        type: Sequelize.INTEGER(10).UNSIGNED,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        references: {
          model: "course",
          key: "id",
        },
      },
      areaId: {
        field: "area_id",
        allowNull: false,
        type: Sequelize.INTEGER(10).UNSIGNED,
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
        references: {
          model: "area",
          key: "id",
        },
      },
      cityId: {
        field: "city_id",
        allowNull: false,
        type: Sequelize.INTEGER(10).UNSIGNED,
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
        references: {
          model: "city",
          key: "id",
        },
      },
      address: {
        allowNull: false,
        type: Sequelize.STRING(50),
      },
      weekDays: {
        field: "week_days",
        allowNull: true,
        type: Sequelize.STRING(15),
        defaultValue: null,
      },
      startDate: {
        field: "start_date",
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      endDate: {
        field: "end_date",
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      from: {
        type: "TIME",
        allowNull: false,
      },
      to: {
        type: "TIME",
        allowNull: false,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("course_group");
  },
};

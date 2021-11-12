"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.describeTable("order").then((tableDefinition) => {
          if (tableDefinition["type"]) {
            return queryInterface.changeColumn("order", "type", {
              type: "TINYINT(4)",
              allowNull: false,
              defaultValue: 0,
            });
          } else {
            return queryInterface.addColumn("order", "type", {
              type: "TINYINT(4)",
              allowNull: false,
              defaultValue: 0,
            });
          }
        }),
        queryInterface.describeTable("order").then((tableDefinition) => {
          if (tableDefinition["expires_in"]) {
            return queryInterface.changeColumn("order", "expires_in", {
              type: Sequelize.INTEGER(3),
              allowNull: true,
              defaultValue: null,
            });
          } else {
            return queryInterface.addColumn("order", "expires_in", {
              type: Sequelize.INTEGER(3),
              allowNull: true,
              defaultValue: null,
            });
          }
        }),
        queryInterface.describeTable("course_group").then((tableDefinition) => {
          if (tableDefinition["capacity"]) {
            return queryInterface.changeColumn("course_group", "capacity", {
              type: Sequelize.INTEGER(3),
              allowNull: true,
              defaultValue: null,
            });
          } else {
            return queryInterface.addColumn("course_group", "capacity", {
              type: Sequelize.INTEGER(3),
              allowNull: true,
              defaultValue: null,
            });
          }
        }),
        queryInterface.describeTable("course_group").then((tableDefinition) => {
          if (tableDefinition["type"]) {
            return queryInterface.changeColumn("course_group", "type", {
              type: "TINYINT(4)",
              allowNull: false,
              defaultValue: 0,
            });
          } else {
            return queryInterface.addColumn("course_group", "type", {
              type: "TINYINT(4)",
              allowNull: false,
              defaultValue: 0,
            });
          }
        }),
        queryInterface.describeTable("course").then((tableDefinition) => {
          if (tableDefinition["type"]) {
            return queryInterface.removeColumn("course", "type");
          } else {
            return Promise.resolve(true);
          }
        }),
        queryInterface.describeTable("student").then((tableDefinition) => {
          if (tableDefinition["education"]) {
            return queryInterface.changeColumn("student", "education", {
              type: Sequelize.INTEGER(2).UNSIGNED,
              allowNull: true,
              defaultValue: null,
            });
          } else {
            return queryInterface.addColumn("student", "education", {
              type: Sequelize.INTEGER(2).UNSIGNED,
              allowNull: true,
              defaultValue: null,
            });
          }
        }),
        queryInterface.describeTable("student").then((tableDefinition) => {
          if (tableDefinition["grade"]) {
            return queryInterface.changeColumn("student", "grade", {
              type: Sequelize.INTEGER(2).UNSIGNED,
              allowNull: true,
              defaultValue: null,
            });
          } else {
            return queryInterface.addColumn("student", "grade", {
              type: Sequelize.INTEGER(2).UNSIGNED,
              allowNull: true,
              defaultValue: null,
            });
          }
        }),
        queryInterface.describeTable("student").then((tableDefinition) => {
          if (tableDefinition["city_id"]) {
            return queryInterface.changeColumn("student", "city_id", {
              type: Sequelize.INTEGER(10).UNSIGNED,
              allowNull: true,
              defaultValue: null,
              references: {
                model: "city",
                key: "id",
              },
              onUpdate: "CASCADE",
              onDelete: "SET NULL",
            });
          } else {
            return queryInterface.addColumn("student", "city_id", {
              type: Sequelize.INTEGER(10).UNSIGNED,
              allowNull: true,
              defaultValue: null,
              references: {
                model: "city",
                key: "id",
              },
              onUpdate: "CASCADE",
              onDelete: "SET NULL",
            });
          }
        }),
        queryInterface.describeTable("student").then((tableDefinition) => {
          if (tableDefinition["area_id"]) {
            return queryInterface.changeColumn("student", "area_id", {
              type: Sequelize.INTEGER(10).UNSIGNED,
              allowNull: true,
              defaultValue: null,
              references: {
                model: "area",
                key: "id",
              },
              onUpdate: "CASCADE",
              onDelete: "SET NULL",
            });
          } else {
            return queryInterface.addColumn("student", "area_id", {
              type: Sequelize.INTEGER(10).UNSIGNED,
              allowNull: true,
              defaultValue: null,
              references: {
                model: "area",
                key: "id",
              },
              onUpdate: "CASCADE",
              onDelete: "SET NULL",
            });
          }
        }),
        queryInterface.describeTable("student").then((tableDefinition) => {
          if (tableDefinition["address"]) {
            return queryInterface.changeColumn("student", "address", {
              type: Sequelize.STRING(50),
              allowNull: true,
              defaultValue: null,
            });
          } else {
            return queryInterface.addColumn("student", "address", {
              type: Sequelize.STRING(50),
              allowNull: true,
              defaultValue: null,
            });
          }
        }),
      ]);
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.describeTable("order").then((tableDefinition) => {
          if (tableDefinition["type"]) {
            return queryInterface.removeColumn("order", "type");
          } else {
            return Promise.resolve(true);
          }
        }),
        queryInterface.describeTable("order").then((tableDefinition) => {
          if (tableDefinition["expires_in"]) {
            return queryInterface.removeColumn("order", "expires_in");
          } else {
            return Promise.resolve(true);
          }
        }),
        queryInterface.describeTable("course_group").then((tableDefinition) => {
          if (tableDefinition["capacity"]) {
            return queryInterface.removeColumn("course_group", "capacity");
          } else {
            return Promise.resolve(true);
          }
        }),
        queryInterface.describeTable("course").then((tableDefinition) => {
          if (tableDefinition["type"]) {
            return queryInterface.changeColumn("course", "type", {
              type: "TINYINT(4)",
              allowNull: false,
              defaultValue: 0,
            });
          } else {
            return queryInterface.addColumn("course", "type", {
              type: "TINYINT(4)",
              allowNull: false,
              defaultValue: 0,
            });
          }
        }),
        queryInterface.describeTable("course_group").then((tableDefinition) => {
          if (tableDefinition["type"]) {
            return queryInterface.removeColumn("course_group", "type");
          } else {
            return Promise.resolve(true);
          }
        }),
        queryInterface.describeTable("student").then((tableDefinition) => {
          if (tableDefinition["education"]) {
            return queryInterface.removeColumn("student", "education");
          } else {
            return Promise.resolve(true);
          }
        }),
        queryInterface.describeTable("student").then((tableDefinition) => {
          if (tableDefinition["grade"]) {
            return queryInterface.removeColumn("student", "grade");
          } else {
            return Promise.resolve(true);
          }
        }),
        queryInterface.describeTable("student").then((tableDefinition) => {
          if (tableDefinition["city_id"]) {
            return queryInterface.removeColumn("student", "city_id");
          } else {
            return Promise.resolve(true);
          }
        }),
        queryInterface.describeTable("student").then((tableDefinition) => {
          if (tableDefinition["area_id"]) {
            return queryInterface.removeColumn("student", "area_id");
          } else {
            return Promise.resolve(true);
          }
        }),
        queryInterface.describeTable("student").then((tableDefinition) => {
          if (tableDefinition["address"]) {
            return queryInterface.removeColumn("student", "address");
          } else {
            return Promise.resolve(true);
          }
        }),
      ]);
    });
  },
};

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface
      .createTable("email_verification", {
        id: {
          type: Sequelize.INTEGER(10).UNSIGNED,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        studentId: {
          field: "student_id",
          allowNull: false,
          type: Sequelize.INTEGER(10).UNSIGNED,
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
          references: {
            model: "student",
            key: "id",
          },
        },
        token: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        createdAt: {
          field: "created_at",
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
      })
      .then(() => {
        console.log("Created email_verification table");
        return queryInterface.sequelize.query(`
        CREATE EVENT expireToken
        ON SCHEDULE AT CURRENT_TIMESTAMP + INTERVAL  1 DAY 
        DO
        DELETE FROM email_verification WHERE created_at < DATE_SUB(NOW(), INTERVAL 1 DAY);
        `);
      })
      .then(() => {
        console.log("expireToken event created");
      });
  },
  down: function (queryInterface) {
    return queryInterface
      .dropTable("email_verification")
      .then(() => {
        console.log("Dropped email_verification table");
        return queryInterface.sequelize.query(
          `DROP EVENT IF EXISTS  expireToken`
        );
      })
      .then(() => {
        console.log("expireToken event dropped");
      });
  },
};

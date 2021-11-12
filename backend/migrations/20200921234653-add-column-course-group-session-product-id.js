"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();

    await queryInterface.addColumn(
      "course_group_session",
      "product_id",
      {
        allowNull: true,
        defaultValue: null,
        type: Sequelize.INTEGER(10).UNSIGNED,
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
        references: {
          model: "product",
          key: "id",
        },
      },
      { transaction }
    );

    let sessions = await queryInterface.sequelize.query(
      `SELECT course_group_session.id FROM course_group_session;`,
      { type: queryInterface.sequelize.QueryTypes.SELECT, transaction }
    );

    sessions = sessions.map((session) =>
      queryInterface.sequelize
        .query("INSERT INTO product (type) values (0)", {
          type: queryInterface.sequelize.QueryTypes.INSERT,
          transaction,
        })
        .then((productId) => {
          console.log(productId[0], session.id);
          queryInterface.sequelize.query(
            `UPDATE course_group_session SET course_group_session.product_id='${productId[0]}' WHERE id=${session.id}`,
            { transaction }
          );
        })
    );

    await Promise.all(sessions);

    await transaction.commit();
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface
      .describeTable("course_group_session")
      .then((tableDefinition) => {
        if (tableDefinition["product_id"]) {
          return queryInterface.removeColumn(
            "course_group_session",
            "product_id"
          );
        } else {
          return Promise.resolve(true);
        }
      });
  },
};

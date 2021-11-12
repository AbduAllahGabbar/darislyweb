"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();

    let sessions = await queryInterface.sequelize.query(
      `
      SELECT
        course_group_session.id,
        course_group_session.from,
        course_group_session.to
      FROM
        course_group_session;`,
      { type: queryInterface.sequelize.QueryTypes.SELECT, transaction }
    );

    sessions = sessions.map((session) => ({
      id: session.id,
      date: session.from.toISOString().split("T")[0],
      from: session.from.toISOString().split("T")[1].split(".")[0],
      to: session.to.toISOString().split("T")[1].split(".")[0],
    }));

    await Promise.all([
      queryInterface.changeColumn(
        "course_group_session",
        "from",
        {
          type: "TIME",
          allowNull: true,
          defaultValue: null,
        },
        { transaction }
      ),
      queryInterface.changeColumn(
        "course_group_session",
        "to",
        {
          type: "TIME",
          allowNull: true,
          defaultValue: null,
        },
        { transaction }
      ),
      queryInterface.addColumn(
        "course_group_session",
        "date",
        {
          type: Sequelize.DATEONLY,
          allowNull: true,
          defaultValue: null,
        },
        { transaction }
      ),
    ]);

    sessions = sessions.map((session) =>
      queryInterface.sequelize.query(
        `UPDATE course_group_session SET
          course_group_session.date='${session.date}',
          course_group_session.from='${session.from}',
          course_group_session.to='${session.to}'
        WHERE id=${session.id}`,
        { transaction }
      )
    );

    await Promise.all(sessions);

    await transaction.commit();
  },

  down: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();

    let sessions = await queryInterface.sequelize.query(
      `
      SELECT
        course_group_session.id,
        course_group_session.date,
        course_group_session.from,
        course_group_session.to
      FROM
        course_group_session;`,
      { type: queryInterface.sequelize.QueryTypes.SELECT, transaction }
    );

    sessions = sessions.map((session) => ({
      id: session.id,
      from: new Date(`${session.date}T${session.from}Z`)
        .toISOString()
        .slice(0, 19)
        .replace("T", " "),
      to: new Date(`${session.date}T${session.to}Z`)
        .toISOString()
        .slice(0, 19)
        .replace("T", " "),
      // from: `${session.date} ${session.from}`,
      // to: `${session.to} ${session.to}`,
    }));

    await Promise.all([
      queryInterface.changeColumn(
        "course_group_session",
        "from",
        {
          type: Sequelize.DATE,
          allowNull: true,
          defaultValue: null,
        },
        { transaction }
      ),
      queryInterface.changeColumn(
        "course_group_session",
        "to",
        {
          type: Sequelize.DATE,
          allowNull: true,
          defaultValue: null,
        },
        { transaction }
      ),
      queryInterface.removeColumn("course_group_session", "date"),
    ]);

    sessions = sessions.map((session) =>
      queryInterface.sequelize.query(
        `UPDATE course_group_session SET
          course_group_session.from='${session.from}',
          course_group_session.to='${session.to}'
        WHERE id=${session.id}`,
        { transaction }
      )
    );

    await Promise.all(sessions);

    await transaction.commit();
  },
};

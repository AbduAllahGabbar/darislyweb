"use strict";
module.exports = (sequelize, DataTypes) => {
  const LiveSession = sequelize.define(
    "LiveSession",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER(10).UNSIGNED,
      },
      meetingId: {
        type: "VARBINARY(60)",
        allowNull: true,
      },
      meetingPassword: {
        type: "VARBINARY(60)",
        allowNull: true,
      },
      meetingUrl: {
        type: "VARBINARY(255)",
        allowNull: true,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      from: {
        type: "TIME",
        allowNull: true,
      },
      to: {
        type: "TIME",
        allowNull: true,
      },
      courseGroupSessionId: {
        allowNull: false,
        type: DataTypes.INTEGER(10).UNSIGNED,
      },
    },
    {
      tableName: "live_session",
      timestamps: true,
      updatedAt: false,
    }
  );

  LiveSession.associate = function (models) {
    LiveSession.belongsTo(models.CourseGroupSession, {
      as: "courseGroupSession",
    });
  };

  return LiveSession;
};

"use strict";
module.exports = (sequelize, DataTypes) => {
  const QuizSession = sequelize.define(
    "QuizSession",
    {
      id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      quizId: {
        field: "quiz_id",
        allowNull: false,
        type: DataTypes.INTEGER(10).UNSIGNED,
      },
      from: {
        type: "TIME",
        allowNull: false,
      },
      to: {
        type: "TIME",
        allowNull: false,
      },
    },
    { tableName: "quiz_session", timestamps: true, updatedAt: false }
  );
  QuizSession.associate = function (models) {
    QuizSession.belongsTo(models.Quiz, { as: "quiz" });
    QuizSession.hasOne(models.QuizAnswer, {
      as: "quizAnswers",
      foreignKey: "quizSessionId",
    });
  };
  return QuizSession;
};

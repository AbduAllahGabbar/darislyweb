"use strict";
module.exports = (sequelize, DataTypes) => {
  const QuizAnswer = sequelize.define(
    "QuizAnswer",
    {
      quizSessionId: {
        allowNull: false,
        type: DataTypes.INTEGER(10).UNSIGNED,
        primaryKey: true,
      },
      studentId: {
        allowNull: false,
        type: DataTypes.INTEGER(10).UNSIGNED,
        primaryKey: true,
      },
      answers: { type: "JSON", allowNull: false },
      correctCount: { field: "correct_count", type: DataTypes.INTEGER(10) },
    },
    {
      tableName: "quiz_answer",
      timestamps: true,
      updatedAt: false,
    }
  );
  QuizAnswer.associate = function (models) {
    QuizAnswer.belongsTo(models.QuizSession, { as: "quizSession" });
    QuizAnswer.belongsTo(models.Student, { as: "student" });
  };
  return QuizAnswer;
};

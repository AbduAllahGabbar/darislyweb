"use strict";
module.exports = (sequelize, DataTypes) => {
  const Quiz = sequelize.define(
    "Quiz",
    {
      id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      lectureId: {
        allowNull: false,
        type: DataTypes.INTEGER(10).UNSIGNED,
      },
      type: {
        type: "TINYINT(4)",
        allowNull: false,
      },
      questions: { type: "JSON", allowNull: false },
      name: {
        type: DataTypes.STRING,
      },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      showAnswers: {
        type: DataTypes.TINYINT(4),
        allowNull: false,
      },
    },
    { tableName: "quiz", timestamps: true, updatedAt: false }
  );
  Quiz.associate = function (models) {
    Quiz.belongsTo(models.Lecture, { as: "lecture" });
    Quiz.hasMany(models.QuizSession, {
      as: "quizSessions",
      foreignKey: "quizId",
    });
  };
  return Quiz;
};

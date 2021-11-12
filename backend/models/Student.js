"use strict";

// TODO add address,city,area, educationSystem, grade

module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define(
    "Student",
    {
      id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      firstName: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      lastName: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      phone: {
        type: DataTypes.STRING(15),
        allowNull: true,
      },
      countryCode: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      country: {
        type: DataTypes.INTEGER(3),
        allowNull: true,
      },
      password: {
        type: "BINARY(60)",
        allowNull: true,
      },
      hasImage: {
        type: "TINYINT(4)",
        allowNull: true,
      },
      emailVerified: {
        type: "TINYINT(4)",
        allowNull: false,
        defaultValue: 0,
      },
      phoneVerified: {
        type: "TINYINT(4)",
        allowNull: false,
        defaultValue: 0,
      },
      education: { type: DataTypes.INTEGER(2).UNSIGNED, allowNull: true },
      grade: { type: DataTypes.INTEGER(2).UNSIGNED, allowNull: true },
      address: { type: DataTypes.STRING(50), allowNull: true },
      cityId: { type: DataTypes.INTEGER(10).UNSIGNED, allowNull: true },
      areaId: { type: DataTypes.INTEGER(10).UNSIGNED, allowNull: true },
      resetPasswordToken: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      resetPasswordExpires: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: "student",
      timestamps: true,
      updatedAt: false,
      hooks: {
        beforeCreate: function (student) {
          if (student.email) {
            student.email = student.email.toLowerCase();
          }
          return student;
        },
      },
    }
  );

  Student.associate = function (models) {
    Student.hasMany(models.QuizAnswer, {
      foreignKey: "studentId",
      as: "quizAnswers",
    });
    Student.hasMany(models.Order, {
      foreignKey: "studentId",
      as: "orders",
    });
    Student.hasMany(models.Attendance, {
      foreignKey: "studentId",
      as: "attendances",
    });
    Student.hasMany(models.CreditCard, {
      foreignKey: "studentId",
      as: "creditCards",
    });
    Student.hasOne(models.AuthenticationProvider, {
      foreignKey: "studentId",
      as: "authenticationProviders",
    });
    Student.hasOne(models.EmailVerification, {
      foreignKey: "studentId",
      as: "emailVerification",
    });
    Student.belongsTo(models.City, { as: "city" });
    Student.belongsTo(models.Area, { as: "area" });
    Student.hasMany(models.CartItem, {
      foreignKey: "studentId",
      as: "cartItems",
    });
  };

  return Student;
};

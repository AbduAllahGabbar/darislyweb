"use strict";

// TODO add address,city,area

module.exports = (sequelize, DataTypes) => {
  const Tutor = sequelize.define(
    "Tutor",
    {
      id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
      countryCode: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      country: {
        type: DataTypes.INTEGER(3),
        allowNull: false,
      },
      password: {
        type: "BINARY(60)",
        allowNull: false,
      },
      hasImage: {
        type: "TINYINT(4)",
        allowNull: true,
      },
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
      tableName: "tutor",
      timestamps: true,
      updatedAt: false,
      hooks: {
        beforeCreate: function (tutor) {
          if (tutor.email) {
            tutor.email = tutor.email.toLowerCase();
          }
          return tutor;
        },
      },
    }
  );

  Tutor.associate = function (models) {
    Tutor.hasMany(models.Course, { as: "courses", foreignKey: "tutorId" });
  };

  return Tutor;
};

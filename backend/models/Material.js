"use strict";
module.exports = (sequelize, DataTypes) => {
  const Material = sequelize.define(
    "Material",
    {
      id: {
        type: DataTypes.STRING(50),
        allowNull: false,
        primaryKey: true,
      },
      lectureId: {
        allowNull: false,
        type: DataTypes.INTEGER(10).UNSIGNED,
      },
      name: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
    },
    { tableName: "material", timestamps: true, updatedAt: false }
  );
  Material.associate = function (models) {
    Material.belongsTo(models.Lecture, { as: "lecture" });
  };
  return Material;
};

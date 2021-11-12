"use strict";
module.exports = (sequelize, DataTypes) => {
  const StaffCenter = sequelize.define(
    "StaffCenter",
    {
      staffId: {
        allowNull: false,
        type: DataTypes.INTEGER(10).UNSIGNED,
        primaryKey: true,
      },
      centerId: {
        allowNull: false,
        type: DataTypes.INTEGER(10).UNSIGNED,
        primaryKey: true,
      },
    },
    {
      tableName: "staff_center",
      timestamps: false,
    }
  );
  StaffCenter.associate = function (models) {
    StaffCenter.belongsTo(models.Staff, { as: "staff" });
    StaffCenter.belongsTo(models.Center, { as: "center" });
  };
  return StaffCenter;
};

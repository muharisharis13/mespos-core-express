"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class uom extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Owners);
    }
  }
  uom.init(
    {
      uuid: DataTypes.UUID,
      uom_name: DataTypes.STRING,
      uom_identifier: DataTypes.STRING,
      descriptions: DataTypes.TEXT,
      ownerId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "uom",
    }
  );
  return uom;
};

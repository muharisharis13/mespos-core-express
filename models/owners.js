"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Owners extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Owners.init(
    {
      uuid: DataTypes.UUID,
      fullname: DataTypes.STRING,
      country: DataTypes.STRING,
      province: DataTypes.STRING,
      city: DataTypes.STRING,
      address: DataTypes.TEXT,
      district: DataTypes.STRING,
      sub_district: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Owners",
    }
  );
  return Owners;
};

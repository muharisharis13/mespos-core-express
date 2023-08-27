"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user.init(
    {
      uuid: DataTypes.UUID,
      fullname: DataTypes.STRING,
      birthdate: DataTypes.DATE,
      phoneNumber: DataTypes.STRING,
      password: DataTypes.STRING,
      token: DataTypes.TEXT,
      tokenRefresh: DataTypes.TEXT,
      referral: DataTypes.STRING,
      height: DataTypes.STRING,
      weight: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "user",
    }
  );
  return user;
};

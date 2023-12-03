"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User_accounts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User_accounts.init(
    {
      uuid: DataTypes.UUID,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      ownerId: DataTypes.INTEGER,
      status: DataTypes.ENUM("active", "non-active"),
      roleId: DataTypes.INTEGER,
      avatar: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "User_accounts",
    }
  );
  return User_accounts;
};

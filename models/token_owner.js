"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class token_owner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User_accounts);
    }
  }
  token_owner.init(
    {
      uuid: DataTypes.UUID,
      token: DataTypes.TEXT,
      refresh_token: DataTypes.TEXT,
      userAccountId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "token_owner",
    }
  );
  return token_owner;
};

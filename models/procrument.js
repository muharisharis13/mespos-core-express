"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class procrument extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  procrument.init(
    {
      uuid: DataTypes.UUID,
      procrument_name: DataTypes.STRING,
      invoice_number: DataTypes.STRING,
      delivery_time: DataTypes.DATE,
      invoice_date: DataTypes.DATE,
      delivery_status: DataTypes.ENUM("pending", "delivered"),
      ownerId: DataTypes.INTEGER,
      supplierId: DataTypes.INTEGER,
      payment_status: DataTypes.ENUM("paid", "unpadi"),
    },
    {
      sequelize,
      modelName: "procrument",
    }
  );
  return procrument;
};

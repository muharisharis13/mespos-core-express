"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  order.init(
    {
      uuid: DataTypes.UUID,
      customerId: DataTypes.INTEGER,
      payment_status: DataTypes.ENUM(
        "paid",
        "partially_paid",
        "voided",
        "hold",
        "partially_refund"
      ),
      total_discount: DataTypes.INTEGER,
      total_order: DataTypes.INTEGER,
      total_refund: DataTypes.INTEGER,
      order_type: DataTypes.ENUM("take_away", "dine_in"),
      cashierId: DataTypes.INTEGER,
      type_discount: DataTypes.ENUM("flat", "percentage"),
      order_number: DataTypes.STRING,
      ownerId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "order",
    }
  );
  return order;
};

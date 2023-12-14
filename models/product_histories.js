"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class product_histories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  product_histories.init(
    {
      uuid: DataTypes.UUID,
      procrumentId: DataTypes.INTEGER,
      order_date: DataTypes.DATE,
      userAccountId: DataTypes.INTEGER,
      initial_stock: DataTypes.INTEGER,
      new_stock: DataTypes.INTEGER,
      qty: DataTypes.INTEGER,
      orderId: DataTypes.INTEGER,
      operation_type: DataTypes.ENUM(
        "sold",
        "deleted",
        "stocked",
        "void_return",
        "stock_return",
        "added",
        "lost"
      ),
      sellingUnitId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "product_histories",
    }
  );
  return product_histories;
};

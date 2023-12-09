"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class selling_unit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.product);
      this.belongsTo(models.uom);
    }
  }
  selling_unit.init(
    {
      uuid: DataTypes.UUID,
      productId: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
      selling_price: DataTypes.INTEGER,
      whosale_price: DataTypes.INTEGER,
      uomId: DataTypes.INTEGER,
      stock: DataTypes.INTEGER,
      min_stock: DataTypes.INTEGER,
      is_enabled_min_stock: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "selling_unit",
      // defaultScope: {
      //   include: {
      //     all: true,
      //     nested: true,
      //     attributes: {
      //       exclude: ["id"],
      //     },
      //   },
      // },
    }
  );
  return selling_unit;
};

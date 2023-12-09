"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class supplier extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Owners, {
        as: "owner",
      });
    }
  }
  supplier.init(
    {
      uuid: DataTypes.UUID,
      supplier_name: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      address_1: DataTypes.TEXT,
      address_2: DataTypes.TEXT,
      ownerId: DataTypes.INTEGER,
      descriptions: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "supplier",
    }
  );
  return supplier;
};

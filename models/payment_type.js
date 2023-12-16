"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class payment_type extends Model {
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
  payment_type.init(
    {
      uuid: DataTypes.UUID,
      ownerId: DataTypes.INTEGER,
      payment_name: DataTypes.STRING,
      display: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "payment_type",
    }
  );
  return payment_type;
};

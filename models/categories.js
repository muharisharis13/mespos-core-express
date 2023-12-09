"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class categories extends Model {
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
  categories.init(
    {
      uuid: DataTypes.UUID,
      category_name: DataTypes.STRING,
      category_identifier: DataTypes.STRING,
      display: DataTypes.BOOLEAN,
      descriptions: DataTypes.TEXT,
      ownerId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "categories",
    }
  );
  return categories;
};

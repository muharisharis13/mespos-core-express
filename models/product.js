"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // this.belongsTo(models.Owners, { as: "owner" });
      this.belongsTo(models.Outlets, { as: "outlet" });
      this.belongsTo(models.categories, { as: "category" });
      this.hasMany(models.selling_unit, { foreignKey: "productId" });
    }
  }
  product.init(
    {
      uuid: DataTypes.UUID,
      outletId: DataTypes.INTEGER,
      product_name: DataTypes.STRING,
      categoryId: DataTypes.INTEGER,
      ownerId: DataTypes.INTEGER,
      status: DataTypes.ENUM("on_sale", "hidden"),
      sku: DataTypes.TEXT,
      descriptions: DataTypes.TEXT,
      on_expired: DataTypes.DATE,
      is_searchable: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "product",
    }
  );
  return product;
};

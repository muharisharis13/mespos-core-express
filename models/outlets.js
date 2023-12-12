"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Outlets extends Model {
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
  Outlets.init(
    {
      uuid: DataTypes.UUID,
      ownerId: DataTypes.INTEGER,
      outlet_name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Outlets",
      defaultScope: {
        include: {
          all: true,
          nested: true,
          attributes: {
            exclude: ["id"],
          },
        },
      },
    }
  );
  return Outlets;
};

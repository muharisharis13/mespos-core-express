'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  customer.init({
    uuid: DataTypes.UUID,
    ownerId: DataTypes.INTEGER,
    balance: DataTypes.INTEGER,
    fullname: DataTypes.STRING,
    userAccountId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'customer',
  });
  return customer;
};
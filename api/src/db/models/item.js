'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Item.belongsTo(models.Stock);
    }
  };
  Item.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    count: {
      type: DataTypes.NUMBER,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'Item',
  });
  return Item;
};

'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      StockId: {
        type: Sequelize.NUMBER,
        allowNull: false,
        references: {
          model: 'Stocks',
          key: 'id'
        }
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      count: {
        type: Sequelize.NUMBER,
        defaultValue: 0
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Items');
  }
};

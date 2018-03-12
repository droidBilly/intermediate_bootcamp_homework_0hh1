const Sequelize = require('sequelize')
const sequelize = require('../db')

const Games = sequelize.define('games', {
    board: {
      type: Sequelize.JSON,
      allowNull: false
    },
    sidebar: {
      type: Sequelize.JSON,
      allowNull: true
    },
    locked: {
      type: Sequelize.JSON,
      allowNull: true
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: true
    }
  },{
  tableName: 'games',
  timestamps: false
})


module.exports = Games

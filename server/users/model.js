const Sequelize = require('sequelize')
const sequelize = require('../db')

const Users = sequelize.define('users', {
    email: {
      type: Sequelize.STRING,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },{
  tableName: 'users',
  timestamps: false
})


module.exports = Users

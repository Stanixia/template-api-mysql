const Sequelize = require('sequelize')
const { sequelize } = require('../db/database')

const Group = sequelize.define('group', {
  GroupId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  Name: { type: Sequelize.STRING(64), allowNull: false },
})

module.exports = Group

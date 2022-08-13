const Sequelize = require('sequelize')
const { sequelize } = require('../db/database')

const GroupMember = sequelize.define('groupMember', {
  GroupMemberId: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  GroupId: { type: Sequelize.INTEGER, allowNull: false },
  UserId: { type: Sequelize.INTEGER, allowNull: false },
})

module.exports = GroupMember

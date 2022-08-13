const { DataTypes } = require('sequelize')
const { sequelize } = require('../db/database')

const User = sequelize.define('user', {
  UserId: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  Name: { type: DataTypes.STRING(64) },
  Email: { type: DataTypes.STRING(320), allowNull: false, unique: true },
  PasswordHash: { type: DataTypes.STRING, allowNull: false },
  Username: { type: DataTypes.STRING(64), allowNull: false, unique: true },
  Enabled: { type: DataTypes.BOOLEAN, defaultValue: 0 },
})

module.exports = User

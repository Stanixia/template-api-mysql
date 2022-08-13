const Sequelize = require('sequelize')

const { MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PWD, MYSQL_DATABASE } =
  process.env

const sequelize = new Sequelize(MYSQL_DATABASE, MYSQL_USER, MYSQL_PWD, {
  host: MYSQL_HOST,
  port: MYSQL_PORT,
  dialect: 'mysql',
})

module.exports = { sequelize }

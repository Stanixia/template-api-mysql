const bcrypt = require('bcrypt')
const { sequelize } = require('./database')

const Users = require('../models/users')
const Groups = require('../models/groups')
const GroupMembers = require('../models/groupMembers')

function sync(callback) {
  let userId = 0
  let groupId = 0
  sequelize
    // .sync()
    .sync({ force: true })
    .then(() => {
      const salt = bcrypt.genSaltSync(10)
      const hash = bcrypt.hashSync('SUPERVISEUR', salt)
      return Users.create({
        Name: 'SUPERVISEUR',
        Email: '',
        PasswordHash: hash,
        Username: 'SUPERVISEUR',
        Enabled: 1,
      })
    })
    .then((user) => {
      userId = user.dataValues.UserId
      return Groups.create({
        Name: 'SUPERVISEUR',
      })
    })
    .then((group) => {
      groupId = group.dataValues.GroupId
      GroupMembers.create({ GroupId: groupId, UserId: userId })
    })
    .then(() => callback())
    .catch((error) => {
      callback(error)
    })
}

module.exports = { sync }

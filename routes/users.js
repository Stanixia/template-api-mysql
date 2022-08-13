const express = require('express')
const {
  postUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} = require('../controllers/users')

const router = express.Router()

router.route('/user').post(postUser)
router.route('/users').get(getAllUsers)
router.route('/user/:id').get(getUser)
router.route('/user/:id').put(updateUser)
router.route('/user/:id').delete(deleteUser)

module.exports = router

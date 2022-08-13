const bcrypt = require('bcrypt')
const User = require('../models/users')

const postUser = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(req.body.password, salt)
    const user = await User.create({
      Name: req.body.name,
      Email: req.body.email,
      PasswordHash: hash,
      Username: req.body.username,
      Enabled: 0,
    })
    if (user != null) {
      res.status(201).json(user)
    } else {
      res.status(404).json({ success: false })
    }
  } catch (error) {
    res.status(500).json(error)
  }
}

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll()
    if (users.length > 0) {
      res.status(200).json(users)
    } else {
      res.status(204).json({ msg: 'Aucun utilisateur trouvé' })
    }
  } catch (error) {
    res.status(500).json(error)
  }
}

const getUser = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findOne({ where: { UserId: id } })
    if (user != null) {
      res.status(200).json(user)
    } else {
      res.status(404).json({ msg: "Cet utilisateur n'existe pas" })
    }
  } catch (error) {
    res.status(500).json(error)
  }
}

const updateUser = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.update(
      { Name: req.body.name, Email: req.body.email },
      { where: { UserId: id } }
    )
    if (user[1]) {
      res.status(200).json({ success: true })
    } else {
      res.status(404).json({ success: false })
    }
  } catch (error) {
    res.status(500).json(error)
  }
}

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.destroy({ where: { UserId: id } })
    console.log(user)
    if (user) {
      res.status(200).json({ success: true })
    } else {
      res.status(404).json({ success: false })
    }
  } catch (error) {
    res.status(500).json(error)
  }
}

module.exports = { postUser, getAllUsers, getUser, updateUser, deleteUser }

require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { sync } = require('./db/sync')

const routesAuth = require('./routes/auth')
const routesUsers = require('./routes/users')
const { authenticateJWT } = require('./controllers/auth')

const app = express()
const port = process.env.PORT

const corsOptions = {
  origin: 'http://localhost',
  optionsSuccessStatus: 200,
}

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/api', cors(corsOptions), routesAuth)
app.use('/api/v1', cors(corsOptions), authenticateJWT, routesUsers)

sync((error) => {
  if (error) {
    console.error(error)
  } else {
    app.listen(port, (err) => {
      if (err) console.error(err)
      console.log(`Serveur en écoute sur le port ${port}`)
    })
  }
})

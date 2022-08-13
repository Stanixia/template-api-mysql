const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/users')

const privateKey = `-----BEGIN RSA PRIVATE KEY-----
MIICXAIBAAKBgQCoCSb/GzFF0Dm4As5c4PWCET3TMLGEr1IP66Ue5PCvuOsvomrn
++3O29nT5jcTILTO/1BC7brDYvW0c3JfeD8vViDrJV8SUnv5RGcD4vayp5A5dgtG
xOiDXdDmkIkt7CzNvkwEUenKjOz0PU+9wa+8fbz4tvq4gZsopzcNt0U6awIDAQAB
AoGAM5xEBvyyIJA4+iSaf3p0zZNAGvqMu4UhvlQRLjEBH+e7DLFlBoWhX/S0rdm6
trxH7IAMhdIAl/xwHRGMYnhLZ1v9uj3PBK5ypnSoZhKt4wCdI8sWATMjkMLyikwA
TnUklkWKfPzpw0ht/zJEVZyuW3m4fbg+f4xHh+GmtbeygjECQQD5zwC4Oerz7BUC
vJPJ70gKUi6RIn/Hoh3dJgAnZQWxRuBAAlHkumnJbyzvL6sT7slpqPi/RJhpOE6D
hCU5Nj6ZAkEArDNQNtLJNls6TWgD7jIDU0KXJSM5t2FIlpBnyKH+4NQ00GXslKbv
5uUD2iFysv5wXLX7qNt0i59metw8pFy3owJAEew2IwGUx9diUoXxHIXcZ1EqIiOV
g18wQVOeozTuSZ/KKw1/jqeJO3iMgsSqw41YSgpjfmWPgc0WZP0wJoCr0QJAKwVC
0/+DP245OZ9z4+1gwUtQoXmUcMkALoVzOD+ogpjhfPMJ0PWH1+J9PODAXBGPFsps
TfpNupgfLTCageGcCwJBAL540VrXvZvW/gxtOGVnRu3Rcmy6Z578Keb6vQSatUg6
n3XZ6SPoEai/tFhmCI0jCnHxndWePrv/1nOfAEZkZ54=
-----END RSA PRIVATE KEY-----`

const publicKey = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCoCSb/GzFF0Dm4As5c4PWCET3T
MLGEr1IP66Ue5PCvuOsvomrn++3O29nT5jcTILTO/1BC7brDYvW0c3JfeD8vViDr
JV8SUnv5RGcD4vayp5A5dgtGxOiDXdDmkIkt7CzNvkwEUenKjOz0PU+9wa+8fbz4
tvq4gZsopzcNt0U6awIDAQAB
-----END PUBLIC KEY-----`

const auth = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        Username: req.body.username,
        Enabled: true,
      },
    })
    if (user != null) {
      const password = req.body.password || ''
      if (bcrypt.compareSync(password, user.dataValues.PasswordHash)) {
        const token = jwt.sign(
          {
            id: user.dataValues.UserId,
            username: user.dataValues.Username,
          },
          privateKey,
          {
            algorithm: 'RS256',
            expiresIn: '24 hours',
          }
        )
        res.send(token)
      } else {
        res.status(404).json({ msg: "Cet utilisateur n'existe pas" })
      }
    } else {
      res.status(404).json({ msg: "Cet utilisateur n'existe pas" })
    }
  } catch (error) {
    res.status(500).json(error)
  }
}

const authenticateJWT = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers.authorization
  if (!!token && token.startsWith('Bearer ')) {
    token = token.slice(7, token.length)
  }
  if (token) {
    jwt.verify(token, publicKey, (err, decoded) => {
      if (err) {
        res.status(401).json('token_not_valid')
      } else {
        req.decoded = decoded
        const newToken = jwt.sign(
          {
            id: decoded.id,
            username: decoded.Username,
          },
          privateKey,
          {
            algorithm: 'RS256',
            expiresIn: '24 hours',
          }
        )

        res.header('Authorization', `Bearer ${newToken}`)
        next()
      }
    })
  } else {
    res.status(401).json('token_required')
  }
}

module.exports = { auth, authenticateJWT }

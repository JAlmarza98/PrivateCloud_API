/* eslint-disable prefer-promise-reject-errors */

const jwt = require('jsonwebtoken')

const generateJWT = (uid = '', name = '') => {
  return new Promise((resolve, reject) => {
    const payload = { uid, name }

    console.log(payload)

    jwt.sign(payload, process.env.SECRET, {
      expiresIn: '4h'
    }, (err, token) => {
      if (err) {
        reject('No se pudo generar el token')
      } else {
        resolve(token)
      }
    })
  })
}

const decodeJWT = (token = '') => {
  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  const jsonPayload = decodeURIComponent(Buffer.from(base64, 'base64').toString('ascii').split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
  }).join(''))
  return JSON.parse(jsonPayload)
}

module.exports = { generateJWT, decodeJWT }

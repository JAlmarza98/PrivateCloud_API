const colors = require('colors/safe')
const nodemailer = require('nodemailer')

const trasnport = nodemailer.createTransport({
  host: process.env.HOST_MAIL,
  port: 465,
  secure: true,
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASSWORD
  }
})

trasnport.verify().then(() => {
  console.log('==============EMAIL SERVER==============')
  console.log(`STATUS: ${colors.green('⦿ ONLINE')}`)
  console.log(`HOST: ${colors.green(process.env.HOST_MAIL)}`)
  console.log(`EMAIL: ${colors.green(process.env.USER_EMAIL)}`)
  console.log('========================================\n')
}).catch(error => {
  console.log('==============EMAIL SERVER==============')
  console.log(`STATUS: ${colors.red('⦿ OFFLINE')}`)
  console.log(`MESSAGE: ${colors.red(error)}`)
  console.log('========================================\n')
})

module.exports = trasnport

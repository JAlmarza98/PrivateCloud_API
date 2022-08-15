const trasnport = require('../config/mailer')
const verifyEmail = require('../templates/login-email')

const sendLoginMail = async (email, id) => {
  await trasnport.sendMail({
    from: `'Private cloud ☁️' < ${process.env.USER_EMAIL}>`, // sender address
    to: email, // list of receivers
    subject: 'Confirma tu cuenta', // Subject line
    html: verifyEmail(id) // html body
  })
}

module.exports = { sendLoginMail }

const { sendLoginMail } = require('../middlewares/send-mail')
const User = require('../models/user.model')

const login = async (req, res) => {
  res.json({
    msg: 'login'
  })
}

const newUser = async (req, res) => {
  const email = req.body.email

  try {
    // Check email
    const duplicateEmail = await User.findOne({ email })

    if (duplicateEmail) {
      return res.status(400).json({
        success: false,
        msg: `El email ${email} ya existe en la base de datos`
      })
    }

    // Add user to database
    const user = new User({ email })
    const userDb = await user.save()

    await sendLoginMail(email, userDb._id.toString())

    res.json({
      success: true,
      msg: 'Se ha enviado la invitacion'
    })
  } catch (error) {
    res.json({
      success: false,
      msg: 'Ha ocurrido un error inesperado, por favor pongase en contacto con el administrador del servicio'
    })
  }
}

module.exports = { login, newUser }

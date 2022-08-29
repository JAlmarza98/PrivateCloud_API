const fs = require('fs')
const path = require('path')
const { sendLoginMail } = require('../middlewares/send-mail')
const { generateJWT } = require('../middlewares/jwt')
const bcrypt = require('bcrypt')
const User = require('../models/user.model')

const login = async (req, res) => {
  const { email, password } = req.body

  try {
    // Check email exist
    const user = await User.findOne({ email })
    if (!user) {
      return res.json({
        success: false,
        msg: 'Email o contraseña incorrectos'
      })
    }

    // Verify password
    const validPassword = bcrypt.compareSync(password, user.password)
    if (!validPassword) {
      return res.json({
        success: false,
        msg: 'Email o contraseña incorrectos'
      })
    }

    // Generate JWT
    const token = await generateJWT(user.id, user.name)

    res.json({
      success: true,
      msg: 'Usuario logueado',
      token
    })
  } catch (error) {
    res.json({
      success: false,
      msg: 'Ha ocurrido un error inesperado, por favor pongase en contacto con el administrador del servicio'
    })
  }
}

const newUser = async (req, res) => {
  const email = req.body.email

  try {
    // Check email
    const duplicateEmail = await User.findOne({ email })

    if (duplicateEmail) {
      return res.json({
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

const validateUser = async (req, res) => {
  const { userID } = req.params
  let { name, password } = req.body

  try {
    const user = await User.findOne({ _id: userID })
    if (!user) {
      return res.json({
        success: false,
        msg: 'El usuario seleccionado no existe'
      })
    }

    if (user.name === name) {
      return res.json({
        success: false,
        msg: 'No se puede usar ese nombre'
      })
    }

    password = bcrypt.hashSync(password, 10)
    const updateUser = await User.updateOne({ _id: userID }, { name, password })

    if (updateUser.modifiedCount !== 0) {
      try {
        fs.mkdir(path.join(process.env.HOME_CLOUD_STORAGE, name), { recursive: true }, (err) => {
          if (err) {
            return console.error(err)
          }
        })

        return res.json({
          success: true,
          msg: 'Has completado tu perfil, ya tienes acceso a la nube. Ahora inicia sesión.'
        })
      } catch (err) {
        console.log(err)
        return res.json({
          success: false,
          msg: 'No se han podido completar su perfil'
        })
      }
    } else {
      return res.json({
        success: false,
        msg: 'No se han podido completar su perfil'
      })
    }
  } catch (error) {
    res.json({
      success: false,
      msg: 'Ha ocurrido un error inesperado, por favor pongase en contacto con el administrador del servicio'
    })
  }
}

module.exports = { login, newUser, validateUser }

const login = async (req, res) => {
  res.json({
    msg: 'login'
  })
}

const newUser = async (req, res) => {
  console.log(req.body)

  res.json({
    msg: 'new user'
  })
}

module.exports = { login, newUser }

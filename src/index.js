const colors = require('colors')
require('dotenv').config()
const express = require('express')
const os = require('os')
const Table = require('cli-table')
const filesRoutes = require('./routes/user.routes')

async function init () {
  const app = express()

  const apiPaths = {
    files: '/api/files'
  }

  app.use(apiPaths.files, filesRoutes)
  console.log(process.env.PORT)

  const PORT = process.env.PORT || 2550
  app.listen(
    { port: PORT },
    () => {
      const table = new Table({})
      const ifaces = os.networkInterfaces()
      const ip = ifaces.Ethernet?.find(ip => ip.family === 'IPv4')?.address
      table.push(
        ['Local URL', `http://localhost:${PORT}`],
        ['Network URL', `http://${ip}:${PORT}`]
      )

      console.log(colors.green('\n PrivateCloud API START\n'))
      console.log(`STATUS: ${colors.green('⦿ ONLINE')}`)
      console.log(table.toString())
    }
  )
}

init()

const colors = require('colors')
const cors = require('cors')
const express = require('express')
const fileUpload = require('express-fileupload')
const os = require('os')
const Table = require('cli-table')

require('dotenv').config()
const { version } = require('../package.json')
const authRoutes = require('./routes/auth.routes')
const Database = require('./config/database')
const directoryRoutes = require('./routes/directories.routes')
const filesRoutes = require('./routes/files.routes')

async function init () {
  const app = express()

  // Database
  const database = new Database()
  await database.init()

  // Middlewares
  app.use(cors())
  app.use(express.json())
  app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
    createParentPath: true
  }))

  const apiPaths = {
    auth: '/api/auth',
    directories: '/api/dir',
    files: '/api/files'
  }

  // Routes
  app.use(apiPaths.auth, authRoutes)
  app.use(apiPaths.directories, directoryRoutes)
  app.use(apiPaths.files, filesRoutes)

  // Server
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

      console.log('===============API SERVER===============')
      console.log(`STATUS: ${colors.green('⦿ ONLINE')}`)
      console.log(`API Version: ${colors.green(version)}`)
      console.log('========================================\n')
      console.log(table.toString())
    }
  )
}

init()

const { Pool } = require('pg')
const colors = require('colors')

const connectDb = async () => {
  try {
    const pool = new Pool({
      user: process.env.PGUSER,
      host: process.env.PGHOST,
      database: process.env.PGDATABASE,
      password: process.env.PGPASSWORD,
      port: process.env.PGPORT
    })

    await pool.connect()
    console.log('================DATABASE================')
    console.log('STATUS: ', colors.green('ONLINE'))
    console.log('DATABASE: ', colors.green(process.env.PGDATABASE))
    console.log('========================================\n')
  } catch (error) {
    console.log('================DATABASE================')
    console.log('STATUS: ', colors.red('OFFLINE'))
    console.log('========================================\n')
  }
}

module.exports = connectDb

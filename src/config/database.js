const { connect } = require('mongoose')
const colors = require('colors')

class Database {
  async init () {
    const MONGO_DB = process.env.DATABASE || 'mongodb+srv://localhost:27017/privateCloud'
    try {
      await connect(MONGO_DB)
      const dbName = MONGO_DB.split('/').pop()
      console.log('================DATABASE================')
      console.log('STATUS: ', colors.green('⦿ ONLINE'))
      console.log('DATABASE: ', colors.green(dbName))
      console.log('========================================\n')
    } catch (error) {
      console.log('================DATABASE================')
      console.log('STATUS: ', colors.red('⦿ OFFLINE'))
      console.log('========================================\n')
    }
  }
}

module.exports = Database

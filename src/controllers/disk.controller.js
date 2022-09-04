const nodeDiskInfo = require('node-disk-info')
const { slash } = require('../middlewares/paths')
const storage = process.env.HOME_CLOUD_STORAGE

const getDiskInfo = async (req, res) => {
  try {
    const [unit] = storage.split(slash)

    const [disk] = nodeDiskInfo.getDiskInfoSync().filter(drive => drive._mounted === unit)

    const total = (disk._blocks / 1024 / 1024 / 1024).toFixed(0) + 'GB'
    const used = (disk._used / 1024 / 1024 / 1024).toFixed(0) + 'GB'
    const available = (disk._available / 1024 / 1024 / 1024).toFixed(0) + 'GB'
    const capacity = disk._capacity

    res.json({
      success: true,
      data: {
        total,
        used,
        available,
        capacity
      }
    })
  } catch (err) {
    res.json({
      success: false,
      msg: 'No se puede calcular la capacidad del disco'
    })
  }
}

module.exports = { getDiskInfo }

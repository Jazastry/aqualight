const { exec } = require('child_process')
module.exports = (plasma) => {
  const maxValue = 255
  const setValue = async ({value}) => {
    let command = `i2cset -y -f 2 0x20 0x03 ${value} ${value} ${value} i`
    exec(command, (error, stdout, stderr) => {
      if (error) {
        return error
      }
      console.log(command)
    })
  }
  return {
    on: () => {
      return setValue(maxValue)
    },
    off: () => {
      return setValue(0)
    }
  }
}

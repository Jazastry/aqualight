const { exec } = require('child_process')
module.exports = (plasma) => {
  let colorPowers = {
    red: 0,
    white: 0,
    blue: 0
  }
  const createCronTask = (data) => {
    return new Promise((resolve, reject) => {
      let {hour, minute, second, power, color} = data
      plasma.emit({
        type: 'cron-create-task',
        data: {hour, minute, second},
        action: () => {
          // console.log(`CHRON EVENT time - ${hour}:${minute}:${second}/ color - ${color} / power - ${power}`)
          colorPowers[color] = power
          let {red, white, blue} = colorPowers
          // `i2cset -y -f 2 0x20 0x03 ${red} ${white} ${blue} i`
          let command = `i2cset -y -f 2 0x20 0x03 ${red} ${white} ${blue} i`
          exec(command, (error, stdout, stderr) => {
            if (error) {
              console.error(`exec error: ${error}`)
              return
            }
            console.log(command)
            console.log(`exec stdout: ${stdout}`)
            console.log(`exec stderr: ${stderr}`)
          })
        }
      }, (err) => {
        if (err) return reject(err)
        resolve()
      })
    })
  }

  const createScheduleForColor = async (schedule) => {
    for (let entry of schedule.graphValueObjects) {
      let {hourString, power} = entry
      let {color} = schedule
      let timeArr = hourString.split(':')
      let hour = timeArr[0]
      let minute = timeArr[1]
      let second = timeArr[2]

      await createCronTask({hour, minute, second, power, color})
    }
  }

  const createSchedule = async (schedules) => {
    for (let schedule of schedules) {
      await createScheduleForColor(schedule)
    }
  }

  const destroySchedule = () => {
    return new Promise((resolve, reject) => {
      plasma.emit('cron-destroy-all-tasks', () => {
        resolve()
      })
    })
  }

  const startSchedule = () => {
    return new Promise((resolve, reject) => {
      plasma.emit('cron-start-all-tasks', () => {
        resolve()
      })
    })
  }

  return {
    createSchedule,
    destroySchedule,
    startSchedule
  }
}

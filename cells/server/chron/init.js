const $require = require(process.cwd() + '/lib/require')
const Schedule = $require('models/schedule')
const cron = require('node-cron')

module.exports = {
  setEventListeners: (plasma, tasks) => {
    plasma.on('cron-create-task', (c, cb) => {
      let {second, minute, hour} = c.data
      let task = cron.schedule(`${second} ${minute} ${hour} * * *`, c.action, { scheduled: false })
      tasks.push(task)
      cb()
    })

    plasma.on('cron-start-all-tasks', (c, cb) => {
      for (let task of tasks) {
        task.start()
      }
      cb()
    })

    plasma.on('cron-stop-all-tasks', (c, cb) => {
      for (let task of tasks) {
        task.stop()
      }
      cb()
    })

    plasma.on('cron-destroy-all-tasks', (c, cb) => {
      for (let task of tasks) {
        console.log('DESTROY task')
        task.destroy()
      }
      cb()
    })
  },
  restoreSavedSchedule: async () => {
    let existingSchedules = await Schedule.find({})
    console.log('existingSchedules', existingSchedules)
  }
}

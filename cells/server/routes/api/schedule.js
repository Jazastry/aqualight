const $require = require(process.cwd() + '/lib/require')
const Schedule = $require('models/schedule')

module.exports = function (plasma, dna, helpers) {
  const scheduleLib = $require('lib/schedule')(plasma)
  return {
    'OPTIONS': helpers.cors,
    'GET': [
      helpers.cors,
      async (req, res) => {
        let schedule = await Schedule.find({})
        res.body = schedule
        res.status(200)
      }
    ],
    'POST': [
      helpers.cors,
      async (req, res) => {
        let {color, graphPoints, graphValueObjects} = req.body
        let resBody = {}
        let existingGraph = await Schedule.findOne({color: color})
        if (!existingGraph) {
          resBody = await Schedule.create({color, graphPoints, graphValueObjects})
        } else {
          existingGraph.graphPoints = graphPoints
          existingGraph.graphValueObjects = graphValueObjects
          await existingGraph.save()
          resBody = existingGraph
        }
        res.body = resBody
        await scheduleLib.destroySchedule()
        let allSchedules = await Schedule.find({})
        await scheduleLib.createSchedule(allSchedules)
        await scheduleLib.startSchedule()
        res.status(200)
      }],
    'POST /start': [
      helpers.cors,
      async (req, res) => {
        await scheduleLib.destroySchedule()
        let allSchedules = await Schedule.find({})
        await scheduleLib.createSchedule(allSchedules)
        await scheduleLib.startSchedule()
        res.status(200)
      }
    ],
    'PUT': helpers.forbidden,
    'DELETE': helpers.forbidden
  }
}

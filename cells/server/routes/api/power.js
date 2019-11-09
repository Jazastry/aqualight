const $require = require(process.cwd() + '/lib/require')
const Schedule = $require('models/schedule')

module.exports = function (plasma, dna, helpers) {
  const scheduleLib = $require('lib/schedule')(plasma)
  const powerLib = $require('lib/power')(plasma)
  return {
    'POST': [
      helpers.cors,
      async (req, res) => {
        let resBody = []
        let existingGraph = await Schedule.find({})
        let power = !existingGraph[0].fullPower
        console.log('power', JSON.stringify(power, null, 2))
        for (let graph of existingGraph) {
          graph.fullPower = power
          await graph.save()
          let {color, fullPower} = graph
          resBody.push({color, fullPower})
        }
        if (power) {
          await scheduleLib.stopSchedule()
          powerLib.on()
        } else {
          powerLib.off()
          await scheduleLib.startSchedule()
        }
        res.body = resBody
        res.status(200)
      }],
    'PUT': helpers.forbidden,
    'DELETE': helpers.forbidden
  }
}

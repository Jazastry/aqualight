const $require = require(process.cwd() + '/lib/require')
const powerLib = $require('lib/power')

module.exports = function (plasma, dna, helpers) {
  return {
    'POST /on': [
      helpers.cors,
      async (req, res) => {
        plasma.emit('cron-stop-all-tasks', () => {
          powerLib.on()
            .then(res.status(200))
            .catch(res.status(500))
        })
      }],
    'POST /off': [
      helpers.cors,
      async (req, res) => {
        plasma.emit('cron-stop-all-tasks', () => {
          powerLib.on()
            .then(res.status(200))
            .catch(res.status(500))
        })
      }],
    'PUT': helpers.forbidden,
    'DELETE': helpers.forbidden
  }
}

const init = require('./init')

module.exports = class OrganicMongoose {
  constructor (plasma, dna) {
    this.dna = dna
    this.dna.emitReady = dna.emitReady || 'Chron'
    this.plasma = plasma
    this.tasks = []

    this.emit = function (type) {
      plasma.emit(type)
    }

    if (dna.reactOn) {
      plasma.on(dna.reactOn, this.init, this)
    } else {
      this.init(null)
    }

    plasma.on('kill', this.dextroy, this)
  }

  init (c, next) { // {second, minute, hour, action}
    init.setEventListeners(this.plasma, this.tasks)

    next && next()
  }

  dextroy (c, next) {
    this.plasma.emit('cron-destroy-all-tasks')
      .then(next)
  }
}

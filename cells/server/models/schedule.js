const mongoose = require('mongoose')
const colors = [
  'white',
  'red',
  'blue'
]
const struct = {
  color: { type: String, enum: colors },
  graphPoints: [{
    _id: false,
    x: { type: Number, required: true },
    y: { type: Number, required: true },
    isMain: {type: Boolean, default: false}
  }],
  graphValueObjects: [{
    _id: false,
    power: { type: Number, required: true },
    hourString: { type: String, required: true }
  }]
}

const schema = new mongoose.Schema(struct)

schema.pre('validate', function (next) {
  if (!this.color) this.invalidate('color is required')
  if (!this.graphPoints.length) this.invalidate('points are required')
  if (!this.graphValueObjects.length) this.invalidate('graph is required')

  next()
})

const Model = mongoose.model('Schedule', schema)
module.exports = Model

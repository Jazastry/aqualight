const util = new Util()
const defaultColors = [
  { color: 'white' },
  { color: 'red' },
  { color: 'blue' }
]

const init = async () => {
  const schedule = await util.getSchedule()

  defaultColors.forEach(({ color }) => {
    let graphPoints
    let existingSchedule = schedule && schedule.find(s => s.color === color)
    if (existingSchedule && existingSchedule.graphPoints) {
      graphPoints = existingSchedule.graphPoints
    }
    const graph = new Graph({
      color: color,
      name: color,
      graphPoints: graphPoints,
      onSave: () => {
        const graphValueObjects = util.convertGraphRsults(graph)
        const graphPoints = graph.getGraphPoints()
        util.saveSchedule({ graphPoints, graphValueObjects, color })
      }
    })
  })
}

init()

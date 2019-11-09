const util = new Util()
const setLoadingOverlay = util.setLoadingOverlay
new Controls({togglePower: util.togglePower})

const graphData = [
  {
    name: 'white',
    bg: 'rgba(225,225,225,0.3)',
    color: 'rgba(225,225,225,0.6)'
  },
  {
    name: 'red',
    bg: '#470505',
    color: 'rgba(225,225,225,0.6)'
  },
  {
    name: 'blue',
    bg: '#040B4A',
    color: 'rgba(225,225,225,0.6)'
  }
]

const init = async () => {
  const schedule = await util.getSchedule()

  // initializr Graph
  graphData.forEach(({ name, bg, color }) => {
    let graphPoints
    let existingSchedule = schedule && schedule.find(s => s.color === name)
    if (existingSchedule && existingSchedule.graphPoints) {
      graphPoints = existingSchedule.graphPoints
    }
    const graph = new Graph({
      bg: bg,
      color: color,
      name: name,
      graphPoints: graphPoints,
      onSave: async () => {
        const graphValueObjects = util.convertGraphRsults(graph)
        const graphPoints = graph.getGraphPoints()
        setLoadingOverlay(true)
        await util.saveSchedule({ graphPoints, graphValueObjects, color: name })
        setLoadingOverlay(false)
      }
    })
  })
}

init()

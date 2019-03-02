const util = new Util()
const defaultColors = [
  { color: 'white' },
  { color: 'red' },
  { color: 'blue' }
]

let loadingOverlay = document.createElement('div')
document.body.appendChild(loadingOverlay)
loadingOverlay.style.position = 'absolute'
loadingOverlay.style.zIndex = '-2'
loadingOverlay.style.width = '100vw'
loadingOverlay.style.height = '100vh'
loadingOverlay.style.backgroundColor = 'rgba(0,0,0,0)'

let setLoadingOverlay = (loading) => {
  if (loading) {
    loadingOverlay.style.zIndex = '100'
    loadingOverlay.style.backgroundColor = 'rgba(0,0,0,0.4)'
  } else {
    loadingOverlay.style.zIndex = '-2'
    loadingOverlay.style.backgroundColor = 'rgba(0,0,0,0)'
  }
}

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
      onSave: async () => {
        const graphValueObjects = util.convertGraphRsults(graph)
        const graphPoints = graph.getGraphPoints()
        setLoadingOverlay(true)
        await util.saveSchedule({ graphPoints, graphValueObjects, color })
        setLoadingOverlay(false)
      }
    })
  })
}

init()

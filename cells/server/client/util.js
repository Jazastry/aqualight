class Util {
  constructor() {
    this.apiUrl = 'http://localhost:1337/api'
    this.dayInMills = moment.duration(24, 'hours').valueOf()
    this.startOfDay = moment().startOf('day')
  }

  percentage(whole, perc) {
    return (whole / 100) * perc
  }

  getDifFormStartOfTheDay(percent) {
    let interval = this.percentage(this.dayInMills, percent)
    let timePoint = this.startOfDay.clone().add(moment.duration(interval, 'ms'))
    return timePoint
  }

  getPercent(whole, val) {
    return (val / whole) * 100
  }

  convertGraphRsults (graph) {
    return graph.resultPoints.map((r, i) => {
      let timePercent = this.getPercent(graph.width, r.x)
      let hour = this.getDifFormStartOfTheDay(timePercent)
      let powerPercent = this.getPercent(graph.height, r.y)
      let power = Math.round(this.percentage(255, powerPercent))
      let hourString = hour.format('H:m:s')
      console.log('hourString', hourString)
      return { power, hourString }
    })
  }

  saveSchedule (data) {
    const dataStr = JSON.stringify(data)
    var xhr = new XMLHttpRequest()
    xhr.open('POST', `${this.apiUrl}/schedule`, true)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(dataStr)
  }

  getSchedule (theUrl) {
    return new Promise((resolve, reject) => {
      let xmlHttp = new XMLHttpRequest()
      xmlHttp.onreadystatechange = () => {
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
          console.log('xmlHttp.responseText', xmlHttp.responseText)
          resolve(JSON.parse(xmlHttp.responseText))
        }
      }
      xmlHttp.open('GET', `${this.apiUrl}/schedule`, true)
      xmlHttp.setRequestHeader('Access-Control-Allow-Origin', '*')
      xmlHttp.send(null)
    })
  }
}

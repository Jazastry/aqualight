class Util {
  constructor() {
    this.apiUrl = `http://${_localIp}:1337/api`
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
      let power = i === graph.resultPoints.length - 1 ? 0 : Math.round(this.percentage(255, powerPercent))
      let hourString = hour.format('H:m:s')
      return { power, hourString }
    })
  }

  saveSchedule (data) {
    return new Promise((resolve, reject) => {
      const dataStr = JSON.stringify(data)
      var xhr = new XMLHttpRequest()
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
          resolve()
        }
      }
      xhr.open('POST', `${this.apiUrl}/schedule`, true)
      xhr.setRequestHeader('Content-Type', 'application/json')
      xhr.send(dataStr)
    })
  }

  getSchedule (theUrl) {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest()
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText))
        }
      }
      xhr.open('GET', `${this.apiUrl}/schedule`, true)
      xhr.setRequestHeader('Access-Control-Allow-Origin', '*')
      xhr.setRequestHeader('Content-Type', 'application/json')
      xhr.send(null)
    })
  }
}

class Graph {
  constructor ({color, name, onSave, graphPoints}) {
    this.color = color
    this.name = name

    this.accurancy = 256
    this.width = 600
    this.height = 300
    this.pointsRadius = 10
    this.accurancyStep = 1 / this.accurancy

    this.p0 = graphPoints ? graphPoints[0] : {x: 0, y: 0, isMain: true}
    this.p1 = graphPoints ? graphPoints[1] : {x: (this.width / 4) * 1, y: this.pointsRadius}
    this.p2 = graphPoints ? graphPoints[2] : {x: (this.width / 4) * 1, y: this.height - this.pointsRadius}
    this.p3 = graphPoints ? graphPoints[3] : {x: this.width / 2, y: this.height}
    this.p4 = graphPoints ? graphPoints[4] : {x: (this.width / 4) * 3, y: this.height - this.pointsRadius}
    this.p5 = graphPoints ? graphPoints[5] : {x: (this.width / 4) * 3, y: this.pointsRadius}
    this.p6 = graphPoints ? graphPoints[6] : {x: this.width, y: 0, isMain: true}

    this.points = [this.p0, this.p1, this.p2, this.p3, this.p4, this.p5, this.p6]
    this.mousePos = null
    this.wrapper = document.createElement('div')
    this.ctx = document.createElement('canvas').getContext('2d')
    this.ctxOverlay = document.createElement('canvas').getContext('2d')
    this.saveButton = document.createElement('button')
    this.saveButton.type = 'button'
    this.resultPoints = []

    this.yLinePoints = []
    this.xLinePoints = []

    this.onSave = onSave

    this.init()
  }

  createPoint (point, i) {
    this.ctx.beginPath()
    this.ctx.arc(point.x, point.y, this.pointsRadius, 0, 2 * Math.PI)
    this.ctx.stroke()
    // add point text
    this.ctx.font = '15px Arial'
    point.index = i
    this.ctx.fillText('p' + i, point.x + 8, point.y + 15)
  }

  getGraphPoints () {
    return this.points
  }

  createHandlePoints (points) {
    points.forEach((p, i) => this.createPoint(p, i))
  }

  bezier (t, p0, p1, p2, p3) {
    let cX = 3 * (p1.x - p0.x)
    let bX = 3 * (p2.x - p1.x) - cX
    let aX = p3.x - p0.x - cX - bX

    let cY = 3 * (p1.y - p0.y)
    let bY = 3 * (p2.y - p1.y) - cY
    let aY = p3.y - p0.y - cY - bY

    let x = (aX * Math.pow(t, 3)) + (bX * Math.pow(t, 2)) + (cX * t) + p0.x
    let y = (aY * Math.pow(t, 3)) + (bY * Math.pow(t, 2)) + (cY * t) + p0.y

    return {x: x, y: y}
  }

  draw () {
    this.ctx.clearRect(0, 0, this.width, this.height)
    this.drawCoordinateNet()

    this.resultPoints = []
    this.createHandlePoints(this.points)
    this.ctx.moveTo(this.p0.x, this.p0.y)
    for (let i = 0; i < 1; i += this.accurancyStep) {
      let p = this.bezier(i, this.p0, this.p1, this.p2, this.p3)
      this.resultPoints.push(p)
      this.ctx.lineTo(p.x, p.y)
    }

    for (let i = 0; i < 1; i += this.accurancyStep) {
      let p = this.bezier(i, this.p3, this.p4, this.p5, this.p6)
      this.resultPoints.push(p)
      this.ctx.lineTo(p.x, p.y)
    }
    this.ctx.stroke()
  }

  getMousePos (canvas, evt) {
    var rect = canvas.getBoundingClientRect()
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    }
  }

  mouseIsInpoint (point) {
    var dx = Math.abs(Math.abs(point.x) - Math.abs(this.mousePos.x))
    var dy = Math.abs(Math.abs(point.y) - Math.abs(this.mousePos.y))
    var distance_clicked = Math.sqrt((dx * dx) + (dy * dy))
    return distance_clicked < this.pointsRadius
  }

  addEventListeners (canvas) {
    canvas.addEventListener('mousemove', (evt) => {
      this.mousePos = this.getMousePos(canvas, evt)
      this.points.forEach(p => {
        if (p.move) {
          p.x = this.mousePos.x
	  if (!p.isMain) {
	    p.y = this.mousePos.y
	  }
          this.draw()
        }
      })
    }, false)

    canvas.addEventListener('mousedown', (evt) => {
      this.points.forEach(p => {
        if (this.mouseIsInpoint(p)) {
          p.move = true
        } else {
          p.move = false
        }
      })
    }, false)

    canvas.addEventListener('mouseup', (evt) => {
      this.points.forEach(p => {
        p.move = false
      })
    }, false)

    this.saveButton.addEventListener('click', this.onSave, false)
  }

  drawCoordinateNet () {
    let boxWidth = this.width / 24
    let boxHeight = this.height / 10

    // draw horizontal lines
    for (let i = 0; i < 10; i += 1) {
      this.ctx.beginPath()
      let y = i * boxHeight
      this.yLinePoints.push(y)
      this.ctx.moveTo(0, y)
      this.ctx.lineTo(this.width, i * boxHeight)
      this.ctx.stroke()
    }
    // draw vertical lines
    for (let i = 0; i < 24; i += 1) {
      this.ctx.beginPath()
      let x = i * boxWidth
      this.xLinePoints.push(x)
      this.ctx.moveTo(x, 0)
      this.ctx.lineTo(x, this.height)
      this.ctx.stroke()
    }
  }

  drawOverlay () {
    let width = this.width + (this.pointsRadius * 2)
    let height = this.height + (this.pointsRadius * 2)
    this.ctxOverlay.clearRect(0, 0, width, height)
    this.ctxOverlay.canvas.width = width
    this.ctxOverlay.canvas.height = height
    this.wrapper.appendChild(this.ctxOverlay.canvas)
    this.ctxOverlay.canvas.style.position = 'absolute'
    this.ctxOverlay.canvas.style.zIndex = '-1'
    this.ctxOverlay.canvas.style.top = 0 + 'px'
    this.ctxOverlay.canvas.style.left = 0 + 'px'
    this.ctxOverlay.font = '15px Arial'
    this.yLinePoints.forEach((p, i) => {
      this.ctxOverlay.fillText(i * 10, 5, p + 5)
    })
    this.xLinePoints.forEach((p, i) => {
      this.ctxOverlay.fillText(i, p + 25, this.height + this.pointsRadius * 2)
    })
  }

  init () {
    document.body.appendChild(this.wrapper)
    this.wrapper.style.position = 'relative'

    this.saveButton.innerHTML = 'Save'
    this.saveButton.style.position = 'absolute'
    this.saveButton.style.left = this.width + 35 + 'px'
    this.wrapper.appendChild(this.saveButton)

    this.ctx.canvas.width = this.width
    this.ctx.canvas.height = this.height
    this.wrapper.appendChild(this.ctx.canvas)
    this.ctx.canvas.style.border = '1px solid #000'
    this.ctx.canvas.style.backgroundColor = this.color
    this.ctx.canvas.style.marginBottom = '30px'
    this.ctx.canvas.style.marginLeft = '30px'

    this.draw()

    this.drawOverlay()

    this.addEventListeners(this.ctx.canvas)
  }
}

class Controls {
  constructor ({togglePower}) {
    this.wrapper = document.createElement('div')
    this.powerButton = document.createElement('button')
    this.powerButton.type = 'button'
    this.togglePower = togglePower
    this.init()
    this.addEventListeners()
  }

  addEventListeners (canvas) {
    this.powerButton.addEventListener('click', this.togglePower, false)
  }

  init () {
    document.body.appendChild(this.wrapper)
    this.wrapper.style.position = 'relative'
    this.wrapper.style.textAlign = 'center'
    this.wrapper.style.paddingTop = '20px'
    this.wrapper.style.paddingBottom = '20px'

    this.wrapper.appendChild(this.powerButton)
    this.powerButton.innerHTML = 'Power'
    this.powerButton.style.fontSize = '1.5rem'
  }
}

const getCells = require('organic-dna-cells-info')
const loadRootDNA = require('./load-root-dna')

module.exports = async function (cellName) {
  let rootDNA = await loadRootDNA()
  let cells = getCells(rootDNA.cells)
  for (let i = 0; i < cells.length; i++) {
    if (cells[i].name === cellName) return cells[i]
  }
}

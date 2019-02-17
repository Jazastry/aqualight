const loadDNA = require('organic-dna-loader')
module.exports = function (mode) {
  return new Promise((resolve, reject) => {
    loadDNA({
      dnaSourcePath: require('./full-dna-path'),
      dnaMode: mode
    }, (err, dna) => {
      if (err) return reject(err)
      resolve(dna)
    })
  })
}

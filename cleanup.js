const cp = require('child_process')
const promisify = require('util').promisify
const exec = promisify(cp.exec)

const cleanup = async () => {
  await exec('rm -rf cells')
  await exec('rm -rf dna')
  await exec('rm -rf node_modules')
  await exec('rm -rf scripts')
  await exec('rm package*')
  await exec('rm README*')
}

try {
  cleanup()
} catch (err) {
  console.error(err)
}

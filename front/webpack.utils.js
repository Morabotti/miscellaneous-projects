const path = require('path')
const tsconfig = require('./tsconfig.json')

function resolveTsconfigPathsToAlias () {
  const { paths } = tsconfig.compilerOptions
  const aliases = {}

  Object.keys(paths).forEach(item => {
    const key = item.replace('/*', '')
    const value = path.resolve(
      __dirname,
      paths[item][0].replace('/*', '').replace('*', '')
    )
    if (!aliases.hasOwnProperty(key)) {
      aliases[key] = value
    }
  })

  return aliases
}

module.exports = {
  resolveTsconfigPathsToAlias
}

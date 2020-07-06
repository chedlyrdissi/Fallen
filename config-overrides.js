const {alias} = require('react-app-rewire-alias')

module.exports = function override(config) {
  alias({
    '@common': 'src/common',
    '@pages': 'src/pages',
    // "@lib": "lib", // in root of app outside of src
  })(config)
  return config
}
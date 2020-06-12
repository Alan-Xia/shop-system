'use strict'

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  devServer: {
    port: 80,
    disableHostCheck: true
  }
}
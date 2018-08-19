const config = require('./webpack.config.js')

module.exports = {
  config,
  content: 'public/',
  devMiddleware: {
    publicPath: '/packs/',
  },
  hotClient: {
    hmr: false,
  },
}

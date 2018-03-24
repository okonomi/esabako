const { environment } = require('@rails/webpacker')
const Webpack = require('webpack')

environment.plugins.append(
  'Provide',
  new Webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    Popper: 'popper.js',
  })
)

module.exports = environment

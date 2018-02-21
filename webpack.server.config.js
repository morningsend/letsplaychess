const webpackConfig = require('./webpack.dev.config')
const nodeExternals = require('webpack-node-externals')

webpackConfig.entry = {
    'server': '../server/index.js',
}
webpackConfig.target = 'node'
webpackConfig.externals = nodeExternals()

module.exports = webpackConfig

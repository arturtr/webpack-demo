const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack= require('webpack')

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build'),
}

const common = {
  // Entry accepts a path or an object of entries.
  // We'll be using the latter form given it's
  // convenient with more complex configurations.
  //
  // Entries have to resolve to files! It relies on Node.js
  // convention by default so if a directory contains *index.js*,
  // it will resolve to that.
  entry: {
    app: PATHS.app,
  },
  output: {
    path: PATHS.build,
    filename: '[name].js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack demo',
    }),
  ],
}

const developmentConfig = {
  devServer: {
    watchOptions: {
      // Delay the rebuild after the first change
      aggregateTimeout: 300,
      // Poll using interval (in ms, accepts boolean too)
      poll: 1000,
    },

    // Enable history API fallback so HTML5 History API based
    // routing works. This is a good default that will come
    // in handy in more complicated setups.
    historyApiFallback: true,

    // Unlike the cli flag, this doesn't set
    // HotModuleReplacementPlugin!
    hot: true,

    // Don't refresh if hot loading fails. If you want
    // refresh behavior, set inline: true instead.
    // hotOnly: true,
    inline: true,

    // Display only errors to reduce the amount of output.
    stats: 'errors-only',

    // Parse host and port from env to allow customization.
    //
    // If you use Vagrant or Cloud9, set
    // host: options.host || '0.0.0.0';
    //
    // 0.0.0.0 is available to all network devices
    // unlike default `localhost`.
    host: process.env.HOST, // Defaults to `localhost`
    port: process.env.PORT, // Defaults to 8080
  },
  plugins: [
    // Ignore node_modules so CPU usage with poll watching drops significantly
    new webpack.WatchIgnorePlugin([
      path.join(__dirname, 'node_modules'),
    ]),
    // Enable multi-pass compilation for enhanced performance
    // in larger projects. Good default.
    new webpack.HotModuleReplacementPlugin({
      // Disabled as this won't work with html-webpack-template yet
      //multiStep: true,
    }),
    new webpack.NamedModulesPlugin(),
  ],
}

module.exports = function(env) {
  if (env === 'production') {
    return common
  }

  return Object.assign(
    {},
    common,
    developmentConfig,
    {
      plugins: common.plugins.concat(developmentConfig.plugins),
    }
  )
}

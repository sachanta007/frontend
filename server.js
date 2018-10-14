var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath
  })
  .listen(process.env.PORT, function (err, result) {
    if (err) {
      console.log(err);
    }
    console.log(result);
    console.log('Running at http://0.0.0.0:3000');
  });

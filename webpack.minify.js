var webpack = require("webpack");
var conf = require("./webpack.config.js");

conf.output.filename = "ToyRouter.min.js";

conf.plugins.push(new webpack.optimize.UglifyJsPlugin({
  compress: false,
}));

conf.plugins.push(new webpack.DefinePlugin({
  'process.env':{
    'NODE_ENV': JSON.stringify('production')
  }
}));

module.exports = conf;

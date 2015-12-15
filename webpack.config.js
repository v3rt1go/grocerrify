'use strict';

module.exports = {
  context: __dirname,
  entry: "./app/main.js",
  output: {
    path: __dirname + "/",
    filename: "./dist/client/bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel",
        query: {
          presets: ['react', 'es2015', 'stage-2']
        }
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      }
    ]
  },
  resolve: {
    alias: {
      // Workaround https://github.com/Reactive-Extensions/RxJS/issues/832, until it's fixed
      'rx$': '<path to rx/dist/rx.js file >'
    }
  }
};

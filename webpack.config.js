const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    app: './public/app.jsx',
    whiteboard: './public/whiteboard-app.jsx'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-react',
              ['@babel/preset-env', { 
                targets: {
                  browsers: ['last 2 versions']
                },
                modules: false 
              }]
            ],
            plugins: [
              ['@babel/plugin-transform-runtime', {
                regenerator: true
              }]
            ]
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/transcriptions.html',
      filename: 'transcriptions.html',
      inject: true,
      favicon: 'icons/favicon.ico',
      chunks: ['app']
    }),
    new HtmlWebpackPlugin({
      template: 'public/whiteboard.html',
      filename: 'whiteboard.html',
      inject: true,
      favicon: 'icons/favicon.ico',
      chunks: ['whiteboard']
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    fallback: {
      path: require.resolve('path-browserify'),
      fs: false,
      process: false
    }
  },
  optimization: {
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  devtool: 'source-map'
};
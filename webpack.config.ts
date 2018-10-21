import webpack from 'webpack'
import { resolve } from 'path'
import Html from 'html-webpack-plugin'
import Clean from 'clean-webpack-plugin'

const plug = (...plugins: any[]): any[] => plugins.filter(plugin => plugin)

interface Environment {
  production: boolean,
  development: boolean
}

export default ({ production, development }: Environment): webpack.Configuration => ({
  mode: production ? 'production' : 'development',

  entry: {
    index: resolve('src', 'index.tsx'),
  },

  output: {
    filename: 'index.js',
    path: resolve('public')
  },

  module: {
    rules: [{
      test: /\.tsx?$/,
      exclude: /node_modules/,
      loader: 'ts-loader'
    }, {
      test: /\.sass$/,
      use: [
        'style-loader',
        'css-loader',
        'sass-loader'
      ]
    }]
  },

  plugins: plug(
    production && new Clean([
      resolve('public')
    ]),

    new Html({
      template: resolve('src', 'index.html'),
      inject: 'head'
    })
  ),

  devServer: {
    contentBase: resolve('public'),
    overlay: true,
    host: '0.0.0.0',
    port: 8080
  }
})
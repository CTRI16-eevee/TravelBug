const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  mode: process.env.NODE_ENV || 'production',
  output: {
    path: path.join(__dirname, '/client/build'),
    filename: 'bundle.js',
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './src/index.html',
      favicon: "./buggy.ico"
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i, 
        loader: 'file-loader',
      }
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },

  devServer: {
    static: {
      // tells webpack dev server where to serve static content
      directory: path.resolve(__dirname,  '/client/build'),
      // path must have wildcard so that all routes are served
      publicPath: '/*',
    },
    hot: true,
    historyApiFallback: true,
    proxy: {
      '/': 'http://localhost:3000',
      secure: true,
      changeOrigin: true,
    },
  },
};

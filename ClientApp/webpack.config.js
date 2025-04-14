const path = require('path');

module.exports = {
  entry: {
    taskList: './src/components/TaskList/index.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '..', 'wwwroot', 'js')
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react']
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
};
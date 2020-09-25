const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env = {}) => {
  const { mode = 'development' } = env;
  const prodMode = mode === 'production';
  const devMode = mode === 'development';

  const getStyleLoaders = () => {
    return [
      prodMode ? MiniCssExtractPlugin.loader : 'style-loader',
      'css-loader',
    ];
  };

  const getPlugins = () => {
    const plugins = [
      new HtmlWebpackPlugin({
        title: 'React app',
        template: './public/index.html',
      }),
    ],

    if (prodMode) {
      plugins.push(
        new MiniCssExtractPlugin({
          filename: 'main-[hash:8].css',
        }),
      )
    }

    return plugins;
  }

  return {
    mode: prodMode ? 'production' : devMode && 'development',

    output: {
      filename: prodMode ? 'main-[hash:8].js' : undefined
    }

    module: {
      rules: [
        // babel loader
        {
          test: /\.js$/,
          exclude: /node_modules/, // exception for js files, which include node_modules dir.
          use: [
            {
              loader: 'babel-loader',
            },
          ],
        },

        // images loader
        {
          test: /\.(png|jpg|jpeg|gif|ico)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: 'images',
                name: '[name]-[sha1:hash:5].[ext]',
              },
            },
          ],
        },

        // fonts loader
        {
          test: /\.(ttf|otf|eot|woff|woff2)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: 'fonts',
                name: '[name].[ext]',
              },
            },
          ],
        },

        // style & css loader
        {
          test: /\.(css)$/,
          use: getStyleLoaders(),
        },

        // sass/scss loader
        {
          test: /\.(s[ac]ss)$/,
          use: [...getStyleLoaders(), 'sass-loader'],
        },
      ],
    },

    plugins: getPlugins(),

    devServer: {
      open: true,
    },
  };
};

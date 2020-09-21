const path = require('path');

module.exports = {
  css: {
    loaderOptions: {
      stylus: {
        import: [
          path.resolve(__dirname, 'src/styles/colors'),
          path.resolve(__dirname, 'src/styles/fonts'),
        ]
      },
    },
  },
  chainWebpack: config => {
    config.module.rules.delete("svg");
  },
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.svg$/,
          oneOf: [
            {
              resourceQuery: /css/,
              use: {
                loader: 'svg-url-loader',
                options: { noquotes: false }
              }
            },
            {
              use: [{
                loader: 'vue-svg-loader',
              }
              ]
            }
          ],
        },
        {
          test: /\.(mov|mp4|MP4)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]'
              }
            }
          ]
        }
      ],
    }
  },
  devServer: {
    disableHostCheck: false
  },
};
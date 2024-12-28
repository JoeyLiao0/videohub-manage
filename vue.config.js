const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  configureWebpack: {
    resolve: {
      alias: {
        // 设置 '@' 别名指向 'src' 目录
        '@': require('path').resolve(__dirname, 'src/'),
      }
    }
  },
  devServer: {
    client: {
      overlay: false
    },
  },
})
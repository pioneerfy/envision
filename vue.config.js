module.exports = {
  // 如果你的应用被部署在 https://www.my-app.com/my-app/，则设置 publicPath 为 /my-app/
  publicPath: '/', // 部署应用包时的基本 URL，Default: '/'
  // publicPath: '/blog' 如果部署到 https://www.faychou.com/blog
  // outputDir: 'dist', // 生产环境构建文件的目录，Default: 'dist'
  // assetsDir: '', // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录，默认 ''
  devServer: {
    proxy: {
      '/api': { // 请求中不带 api
         target: 'http://127.0.0.1:3000',
         pathRewrite: {'^/api': ''},
         changeOrigin: true
       }
    }
  }
}
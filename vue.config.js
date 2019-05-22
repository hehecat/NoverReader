module.exports = {
  devServer: {
    // 设置主机地址
    host: '127.0.0.1',
    // 设置默认端口
    port: 8080,
    // 设置代理
    proxy: {
      // 匹配开头为 api 的访问使用代理
      '/api': {
        // 目标 API 地址
        target: 'http://127.0.0.1/',
        // 如果要代理 websockets
        // ws: true,
        // 将主机标头的原点更改为目标URL
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },

  assetsDir: '',
  publicPath: './', //用户部署的基本url,如果不配置默认为部署所在域的根目录，如果不要部署到子路径，则需要配置该项。如果设为空，转移后的使用相对路径引用文件。并且将所有的css js都放到了根目录
  outputDir: 'www', //输出文件夹，我这里设为www,主要是和Cordova配合生成安卓应用的。
  productionSourceMap: false, //不生成map
  runtimeCompiler: true // 包含运行时编译器的 Vue 构建版本
}

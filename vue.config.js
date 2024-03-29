module.exports = {
  devServer: {
    open: true,
    host: 'localhost',
    port: 8080,
    https: false,
    proxy: {
      '/api': {
        target: 'http://api.vikingship.xyz/api',
        ws: true,
        changOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}

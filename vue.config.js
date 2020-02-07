module.exports = {
  css: {
    sourceMap: true,
  },
  // 이거 없이 컴파일해서 올렸을 때 404 떨어짐.
  publicPath: process.env.NODE_ENV === 'production' ? '/vue-admin/' : '/',
  outputDir: 'docs',
  //   devServer: {
  //     proxy: {
  //       '/api': {
  //         target: 'http://localhost:8081',
  //         ws: true,
  //       },
  //     },
  //   },
};

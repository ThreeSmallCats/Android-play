module.exports={
  devServer:{
    proxy:{
      "/play":{
        target: "http://www.wanandroid.com/",
        // ws:true,
        changeOrigin:true,
        pathRewrite:{
          "^/play":""
        }
      },
      "/api":{
        target: 'http://www.wanandroid.com/',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  }
}
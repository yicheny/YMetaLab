const { createProxyMiddleware } = require('http-proxy-middleware')
const fs = require('fs')

// const url = "http://192.168.9.151:9101";
module.exports = function (app){
    app.use('/api',createProxyMiddleware({
        target:'runtime-proxy-server',
        changeOrigin:true,
        pathRewrite:{
            '/api':'/'
        },
        router:()=>readEnv('/api')
    }))
}

//
function readEnv(prefix){
    const text = fs.readFileSync(`${__dirname}\\.env`,'utf-8')
    const purelyUrlInfo = text.split('\r\n').map(x=>x.trim()).filter(x=>!(x==='' || x.startsWith('#')))
    const urlDict = purelyUrlInfo.reduce((acc,x)=>{
        const [key,url] = x.split(' ')
        acc[key] = url;
        return acc;
    },{})
    const key = urlDict[prefix]
    return urlDict[key]
}

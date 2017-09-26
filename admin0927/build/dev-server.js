require('./check-versions')()

var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var router = express.Router()
var bodyParser = require('body-parser')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = (process.env.NODE_ENV === 'testing' || process.env.NODE_ENV === 'production')
  ? require('./webpack.prod.conf')
  : require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json())

var menus = require('../mockfile/leftmenu.json')
router.post('/loginapi', (req, res) => {
  console.log(req.body)
  if (typeof(req.body.mobile) !== 'undefined' && 
    typeof(req.body.password) !== 'undefined') {
    if (req.body.mobile === '000000' && req.body.password === '123456') {
      res.json({
        code: 0,
        message: 'login success'
      })
    } else {
      res.json({
        code: 1,
        message: 'mobile or password error!'
      })
    }
  } else {
    res.json({
      code: 1,
      message: 'parma error!'
    })
  }
})
router.get('/usercenter', (req, res) => {
  res.json({
    code: 0,
    data: {
      "username": "nius"
    }
  })
})
router.get('/menus', (req, res) => {
  res.json({
    code: 0,
    message: "success",
    data: menus
  })
})
router.get('/logout', (req, res) => {
  res.json({
    code: 0,
    message: "success",
  })
})
router.get('/artcles', (req, res) => {
  res.json({
    errno: 0,
    data: {
      "artclename": "虎皮查"
    }
  })
})
// app.use('/api', router)
var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: false,
  heartbeat: 2000
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// // proxy api requests
// Object.keys(proxyTable).forEach(function (context) {
//   var options = proxyTable[context]
//   if (typeof options === 'string') {
//     options = { target: options }
//   }
//   app.use(proxyMiddleware(options.filter || context, options))
// })

// 这里有修改
var context = config.dev.context;

// var proxypath = 'http://cangdu.org:8001';
// var proxypath = 'http://192.168.0.107:8080';
var proxypath = 'http://testapi.center.birdwork.cn';
var options = {
    target: proxypath,
    changeOrigin: true
}
if (context.length) {
    app.use(proxyMiddleware(context, options))
}

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})

var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
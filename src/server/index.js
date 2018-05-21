const fs = require('fs')
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const morgan = require('morgan')
const passport = require('passport')
const cors = require('cors')
const BearerStrategy = require('passport-http-bearer').Strategy
const container = require('./container')
const forceSSL = require('express-force-ssl');
/*
    import React from 'react'
    import morgan from 'morgan'
    import { renderToString } from 'react-dom/server'
    import { StaticRouter } from 'react-router-dom'
    import { renderRoutes } from 'react-router-config'
    import { Routes } from '../client/Routes'
*/
const app = express()
console.log(process.argv)
let useHttps = false
if(process.argv.length >= 3 && process.argv[2] ==='--use-https') {
    console.log('server running in https mode')
    useHttps = true
}

let secureServer = null
let httpServer = null
if(useHttps) {
    secureServer = require('https').createServer({
        key: fs.readFileSync(__dirname + '/localhost.key'),
        cert: fs.readFileSync(__dirname + '/localhost.crt'),
    }, app)
    httpServer = require('http').createServer((request, response) => {
        console.log(request.headers)
        const host = request.headers.host.replace(/\d+$/, httpsPort)
        response.writeHead(301, 
            {
                Location: 'https://' + host + request.url
            }
        )
    })
} else {
    httpServer = require('http').Server(app)
}   
const port = 3000
const httpsPort = 3001
const io = require('socket.io')
const { ChatSocketServer, GameSocketServer } = require('./realtime')

const {
    UserApi,
    GameApi,
    ReplayApi,
    AuthenApi,
    RegisterApi,
    MatchApi,
} = require('./apis')

const authen = container.resolve('AuthenService')
passport.use(new BearerStrategy((token, done) =>{
    authen.verifyToken(token)
        .then(result => {
            if(result)
                done(null, result, { scope: 'all' })
            else {
                done(new Error('did not work'))
            }
        })
        .catch((error) => {
            done(error)
        })
}))
app.use(cors())
app.use(morgan('combined'))
app.use(bodyParser.json())
if(useHttps) {
    app.use(forceSSL)
    app.set('forceSSLOptions', {
        enable301Redirects: true,
        trustXFPHeader: false,
        httpsPort: httpsPort,
        sslRequiredMessage: `{ "success": false, "message": "SSL required."}`
    })
}
app.use(express.static(path.resolve(__dirname, '../../build')))

app.get('/', (request, response) => {
    response.send('hello world')
})

app.use('/api' + UserApi.url, passport.authenticate('bearer', { session: false }), UserApi.router)
app.use('/api' + GameApi.url, passport.authenticate('bearer', { session: false }), GameApi.router)
app.use('/api' + MatchApi.url, passport.authenticate('bearer', { session: false}), MatchApi.router)
app.use('/api' + AuthenApi.url, AuthenApi.router)
app.use('/api' + ReplayApi.url, passport.authenticate('bearer', { session: false }), ReplayApi.router)
app.use('/api' + RegisterApi.url, RegisterApi.router)


app.get('/register', (request, response) => {
    response.redirect('/?next=' + encodeURIComponent('/register'))
})

app.get('/account', (request, response) => {
    response.redirect('/?next=' + encodeURIComponent('/account'))
})

app.get('/game', (request, response) => {
    response.redirect('/?next=' + encodeURIComponent('/game'))
})

let ioServer = null
if(useHttps) {
    ioServer = io.listen(secureServer, {
        origins: 'https://localhost:*',
        transports: ['websocket'],
        path: '/realtime'
    })
} else {
    ioServer = io.listen(httpServer, {
        origins: 'http://localhost:*',
        transports: ['websocket'],
        path: '/realtime'
    })
}

const chatServer = new ChatSocketServer(ioServer, container.resolve('UserRepository'))
const gameServer = new GameSocketServer(ioServer, container.resolve('MatchRepository'))




if(useHttps) {
    secureServer.listen(httpsPort)
}
httpServer.listen(port)

console.log(`server listening on port ${port}`)
if(useHttps) {
    console.log(`https server listening on port ${httpsPort}`)
}


const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const morgan = require('morgan')
const passport = require('passport')
const cors = require('cors')
const BearerStrategy = require('passport-http-bearer').Strategy
const container = require('./container')
/*
    import React from 'react'
    import morgan from 'morgan'
    import { renderToString } from 'react-dom/server'
    import { StaticRouter } from 'react-router-dom'
    import { renderRoutes } from 'react-router-config'
    import { Routes } from '../client/Routes'
*/
const app = express()

const http = require('http').Server(app)
const port = 3000
const io = require('socket.io')
const { ChatSocketServer } = require('./realtime/ChatSocketServer')

const {
    UserApi,
    GameApi,
    ReplayApi,
    AuthenApi,
    RegisterApi,
} = require('./apis')

const authen = container.resolve('AuthenService')
passport.use(new BearerStrategy((token, done) =>{
    authen.verifyToken(token)
        .then(result => {
            if(result)
                done(null, null, { scope: 'all' })
            else {
                done(new Error('did not work'))
            }
        })
        .catch((error) => {
            done(error)
        })
}))

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(express.static(path.resolve(__dirname, '../../build')))
app.use(cors())
app.get('/', (request, response) => {
    /*const html = renderToString(<StaticRouter location={request.url} context={{}}>
            {renderRoutes(Routes)}
                                </StaticRouter>)
    */
    response.send('hello world')
})

app.use('/api' + UserApi.url, passport.authenticate('bearer', { session: false }), UserApi.router)
app.use('/api' + GameApi.url, passport.authenticate('bearer', { session: false }), GameApi.router)
app.use('/api' + AuthenApi.url, AuthenApi.router)
app.use('/api' + ReplayApi.url, passport.authenticate('bearer', { session: false }), ReplayApi.router)
app.use('/api' + RegisterApi.url, RegisterApi.router)

const ioServer = io.listen(http, {
    origins: 'http://localhost:*',
    transports: ['websocket']
})

const chatServer = new ChatSocketServer(ioServer)

http.listen(port)

console.log(`server listening on port ${port}`)

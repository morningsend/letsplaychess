
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
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
const { ChatServer } = require('./realtime/ChatServer')

const {
    UserApi,
    GameApi,
    ReplayApi,
    AuthenApi
} = require('./apis')

app.use(express.static(path.resolve(__dirname, '../../build')))
app.use(bodyParser.json());



app.get('/', (request, response) => {
    /*const html = renderToString(<StaticRouter location={request.url} context={{}}>
            {renderRoutes(Routes)}
                                </StaticRouter>)
    */
    response.send('hello world')
})

app.use('/api' + UserApi.url, UserApi.router)
app.use('/api' + GameApi.url, GameApi.router)
app.use('/api' + AuthenApi.url, AuthenApi.router)
app.use('/api' + ReplayApi.url, ReplayApi.router)

const ioServer = io.listen(http, {
    origins: 'http://localhost:*',
    transports: ['websocket']
})

const chatServer = new ChatServer(ioServer)

http.listen(port)

console.log(`server listening on port ${port}`)

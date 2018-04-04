
const express = require('express')
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
const io = require('socket.io')(http)
const { ChatServer } = require('./realtime/ChatServer')

app.use(express.static(path.resolve(__dirname, '../../build')))

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.get('/', (request, response) => {
    /*const html = renderToString(<StaticRouter location={request.url} context={{}}>
            {renderRoutes(Routes)}
                                </StaticRouter>)
    */                
    response.send('hello world')
})

io.listen(http, {port: 3000})
const chatServer = new ChatServer(io)

app.listen(port)
console.log(`server listening on port ${port}`)

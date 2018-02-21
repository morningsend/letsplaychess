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

const server = express()
const port = 3000

server.use(express.static(path.resolve(__dirname, '../../build')))
server.get('/', (request, response) => {
    /*const html = renderToString(<StaticRouter location={request.url} context={{}}>
            {renderRoutes(Routes)}
                                </StaticRouter>)
    */                
    response.send('hello world')
})

server.listen(port)
console.log(`server listening on port ${port}`)

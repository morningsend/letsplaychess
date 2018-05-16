const express = require('express')

const url = '/games'
const router = express.Router()

router.get('/', (request, response) => {
    response.end('hello world')
})

export {
    url,
    router
}
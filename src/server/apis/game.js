const express = require('express')

const url = '/games'
const router = express.Router()

router.get('/:gameId', (request, response) => {
    response.send('hello world')
})

export {
    url,
    router
}
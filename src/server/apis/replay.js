const express = require('express')

const url = '/replays'
const router = express.Router()

router.get('/:replayId', (request, response) => {
    response.send('hello world')
})

export {
    url,
    router
}
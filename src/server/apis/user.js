const express = require('express')

const url = '/users'
const router = express.Router()

router.get('/', (request, response) => {
    const data = {
        message: 'hello world'
    }
    response.json(data)
})

router.get('/:userId', (request, response) => {
    const data = {
        userId: request.params.userId,
        ranking: 1200,
        joined: '2018-03-23',
        lastActive: '5 days ago'
    }

    response.json(data)
})

export {
    url,
    router
}
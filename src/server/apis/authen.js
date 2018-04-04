const express = require('express')

const url = '/authen'
const router = express.Router()

router.get('/login', (request, response) => {
    response.send('hello world')
})

export {
    url,
    router
}
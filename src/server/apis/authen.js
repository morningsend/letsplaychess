const express = require('express')

const url = '/authen'
const router = express.Router()

router.post('/login', (request, response) => {
    const username = request.body.username
    const password = request.body.password
    console.log(request.body)
    response.json({
        username,
        password
    })
})

export {
    url,
    router
}
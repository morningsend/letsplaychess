const express = require('express')

const url = '/authen'
const router = express.Router()

const container = require('../container')
const { NotFoundError } = require('../common/Errors')

router.post('/login', async (request, response) => {
    const username = request.body.username
    const password = request.body.password

    if(!username || !password) {
        response.status(400)
            .response({
                success: false,
                message: 'resquest body missing username or password',
            })
        return
    }
    try{
        const authenService = container.resolve('AuthenService')
        const tokenResult = await authenService.signInWithUserName(username, password)
        response.json({
            success: true,
            message: 'Successfully signed in.',
            username,
            token: tokenResult.token,
            expiresIn: tokenResult.expiresIn, 
        })
    }catch(error) {
        console.log(error)
        if(error instanceof NotFoundError) {
            response.status(404)
                .send({
                    success: false,
                    message: 'username and password combination is not found'
                })
        }
        else {
            response.sendStatus(500)
        }
    }
})

export {
    url,
    router
}
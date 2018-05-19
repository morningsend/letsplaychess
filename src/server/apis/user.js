import { NotFoundError } from '../common/Errors';

const express = require('express')
const container = require('../container')

const url = '/users'
const router = express.Router()

router.get('/', (request, response) => {
    const data = {
        message: 'hello world'
    }
    response.json(data)
})

router.get('/:userId', async (request, response) => {
    const userId = request.params.userId
    if(!userId) {
        response.status(400)
            .json({
                error: 'must provide user id.'
            })
        return
    }
    try{
        const userRepository = container.resolve('UserRepository')
        const user = await userRepository.findUserById(userId)
        response.json({
            id: user._id,
            username: user.username,
            email: user.email,
            isGuest: user.isGuest,
            profile: user.profile || {},
            summary: user.summary || {},
            ranking: user.ranking,
        })
    } catch(error) {
        if(error instanceof NotFoundError) {
            response.status(404)
                .json({
                    error: 'user is not found.'
                })
        } else {
            response.status(500)
                .json({
                    error: error.message,
                })
        }
    }
})

export {
    url,
    router
}
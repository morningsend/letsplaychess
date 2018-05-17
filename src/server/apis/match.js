import { NotFoundError, TimeoutError } from '../common/Errors';

const express = require('express')

const url = '/match'
const router = express.Router()

const container = require('../container')

router.post('/find', async (request, response) => {
    const userId = request.body.userId
    const timestamp = new Date().getTime()
    if(!userId) {
        // bad request
        response.status(400)
            .send({
                success: false,
                message: 'resquest body missing userId',
            })
        return
    }
    try{
        const matchMakingService = container.resolve('MatchMakingService')
        const result = await matchMakingService.enqueueRequest(userId, timestamp, 30)
        response.json({
            success: true,
            message: 'Found opponent',
            userId: userId,
            whitePlayerId: result.whitePlayerId,
            blackPlayerId: result.blackPlayerId,
            joinToken: result.joinToken,
            matchId: result.matchId,
        })
    }catch(error) {
        console.error(error)
        if(error instanceof NotFoundError) {
            response.status(404)
            response.send({
                success: false,
                message: error.message,
            })
        } else if(error instanceof TimeoutError){
            response.status(504)
            response.send({
                success: false,
                message: error.message
            })
        }
        else {
            resonse.status(500)
            response.send({
                success: false,
                error: error.message
            })
        }
    }
})

router.get('/:matchId', (request, response) => {

})
export {
    url,
    router
}
import { TimeoutError, NotFoundError } from '../common/Errors'
import { PlayerColours } from '../../chess'
/**
 * Basically a deferred asynchronuous pattern.
 */
export class MatchingMakingRequest {
    constructor(userId, timestamp, timeoutSeconds) {
        this.fulfilled = false
        this.timedOut = false
        this.requestData = {}
        this.timeoutMs = timeoutSeconds * 1000
        this.userId = userId
        this.timestamp = timestamp
        this.cancelled = false
        this.error = null
    }
    fullfil(match) {
        if(this.timedOut || this.cancelled) {
            return
        }
        const requestData = {
            matchId: match._id,
            whitePlayerId: match.whitePlayerId,
            blackPlayerId: match.blackPlayerId,
            joinToken: match.joinToken,
        }
        this.fulfilled = true
        this.requestData = requestData
        if(this.promiseResolve) {
            this.promiseResolve(requestData)
        }
    }
    cancel(error) {
        if(this.fulfilled || this.timedOut) {
            return
        } 
        this.cancelled = true
        this.error = error
        this.promiseReject && this.promiseReject(error)
    }
    cancelTimer() {
        if(this.timer) {
            clearTimeout(this.timer)
            this.timer = undefined
        }
    }
    promise() {
        const self = this
        return new Promise((resolve, reject) => {
            self.promiseResolve = resolve
            self.promiseReject = reject
            if(self.cancelled) {
                reject(self.error|| new Error('request cancelled.'))
            }
            else if(self.fulfilled) {
                resolve(self.requestData)
            } else {
                self.timer = setTimeout(()=> {
                        if(!self.fulfilled) {
                            self.timedOut = true
                            reject(new TimeoutError('Match making request timed out.'))
                        }
                    },
                    self.timeoutMs
                )
            }
        })
    }
}
export class MatchMakingService {
    

    requestQueue = []

    constructor(userRepository, matchRepository) {
        this.userRepository = userRepository
        this.matchRepository = matchRepository
    }

    enqueueRequest(userId, timestamp, timeout) {
        return this.userRepository
            .findUserById(userId)
            .then(user => {
                if(!user) {
                    throw new NotFoundError('user does not exist.')
                } else {
                    timeout = timeout || 30
                    timeout = Math.min(60, Math.max(5, timeout))
                    const request = new MatchingMakingRequest(userId, timestamp, timeout)
                    let matchedRequest;
                    while(this.requestQueue.length > 0) {
                        matchedRequest = this.requestQueue.shift()
                        if(!matchedRequest.timedOut) {
                            matchedRequest.cancelTimer()
                            break;
                        }
                    }
                    if(!matchedRequest) {
                        this.requestQueue.push(request)
                    } else {
                        const joinToken = Math.random().toString(36).substring(7);
                        const createdAt = Date.now()
                        this.matchRepository
                            .create(joinToken, matchedRequest.userId, request.userId, createdAt)
                            .then(match => {
                                request.fullfil(match)
                                matchedRequest.fullfil(match)
                            })
                            .catch(error => {
                                request.cancel(error)
                                matchedRequest.cancel(error)
                            })
                    }
                    return request.promise()
                }
            })
    }
}
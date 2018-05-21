import { NotFoundError } from '../server/common/Errors';

const Datastore = require('nedb')

const MatchOutcome = {
    UNDECIDED: 'undecided',
    WHITE_WINS: 'white_wins',
    BLACK_WINS: 'black_wins',
    DRAW: 'draw',
}

/*
Match object data schema:
{
    _id: string,
    whitePlayerId: string,
    blackPlayerId: string,
    joinToken: string,
    tokenExpiresAt: long,
    createdAt: long,
    outcome: UNDECIDED
}
 */
/**
 * Repository for reading and updating match objects.
 */
export class MatchRepository {
    // 16 minutes
    static tokenExpiry = 6 * 16
    constructor() {
        this.matches = new Datastore()
    }
    create(joinToken, whitePlayerId, blackPlayerId, createdAt, whitePlayer, blackPlayer) {
        const tokenExpiresAt = createdAt + MatchRepository.tokenExpiry * 1000
        const newMatch = {
            joinToken,
            whitePlayerId,
            blackPlayerId,
            createdAt,
            tokenExpiresAt,
            whitePlayer,
            blackPlayer,
            outcome: MatchOutcome.undecided,
        }
        return new Promise((resolve, reject) => {
            this.matches.insert(newMatch, (error, match) => {
                if(error) {
                    reject(error)
                } else {
                    console.log('created match: ', match)
                    resolve(match)
                }
            })
        })
    }

    findMatchById(matchId) {
        if(!matchId) {
            return Promise.reject(new NotFoundError('match id cannot be empty.'))
        }
        return new Promise((resolve, reject) => {
            this.matches.findOne({ _id: matchId}, (error, match) => {
                if(error) {
                    reject(error)
                } else {
                    resolve(match)
                }
            })
        })
    }

    save(match) {
        if(!match) {
            return Promise.reject('match cannot be null or undefined')
        } else {
            this.matches.replaceOne(
                { _id: match._id},
                match
            )
        }
    }
}

import config from '../config'

export class MatchApi {
    static endpoint = '/match'
    static findMatch(userId, accessToken) {
        if(!userId) {
            return Promise.reject(new Error('userId must not be empty.'))
        }
        const url = config.apiUrl + MatchApi.endpoint + '/find'
        return fetch(url, {
            method: 'POST',
            body: JSON.stringify({ userId }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + accessToken,
            }
        })
        .then(response => response.json())
    }
}
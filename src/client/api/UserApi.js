import config from '../config'

export class UserApi {
    static endpoint = '/users'

    static getUser(userId, accessToken) {
        if(!userId || !accessToken) {
            return Promise.reject(new Error('user ID or access token is empty.'))
        }
        const url = config.apiUrl + UserApi.endpoint + '/' + userId

        return fetch(
            url,
            {
                headers: {
                    Accept: 'application/json',
                    Authorization: 'bearer ' + accessToken
                }
            })
            .then(response => response.json())
    }
}
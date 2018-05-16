import config from '../config'

export class AuthenApi {
    static endpoint = '/authen'

    static login(username, password) {
        const url = config.apiUrl + AuthenApi.endpoint + '/login'
        if(!username || !password) {
            return Promise.reject(new Error('username or password cannot be null'))
        }
        const payload = {
            username,
            password,
        }
        return fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(payload),
        })
        .then(response => response.json())
    }
}
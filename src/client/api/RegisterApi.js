import config from '../config'

export class RegisterApi {
    static endpoint = '/register'

    static register(username, email, password) {
        const url = config.apiUrl + RegisterApi.endpoint
        if(!username || !email || !password) {
            return Promise.reject(new Error('username, email, and password cannot be empty.'))
        }
        const payload = {
            username,
            email,
            password,
        }
        return fetch(
            url,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify(payload)
            })
            .then(response => response.json())
            .then(result => {
                if(result.success) {
                    return true
                } else {
                    return false
                }
            })
    }
    static isUsernameAvailable(username) {
        const url = config.apiUrl + RegisterApi.endpoint + '/check_username'
        if(!username) {
            return Promise.reject(new Error('username cannot be empty'))
        }
        return fetch(
            url + '?username=' + username,
            {
                headers: {
                    'Accept': 'application/json',
                },
            }
        )
        .then(response => response.json())
        .then(result => {
            return result && result.available
        })
    }
}
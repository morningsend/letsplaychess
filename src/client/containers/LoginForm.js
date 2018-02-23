import React from 'react'

export class LoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <form className='login-form'>
                <input placeholder='Username or email' />
                <input placeholder='password' type='password' />
                <button className='button login-button'>
                    Login
                </button>
            </form>
        )
    }
}

export default LoginForm

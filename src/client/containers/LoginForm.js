import React from 'react'

export class LoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            formValid: false,
        }
        this.onPasswordTyping = this.onPasswordTyping.bind(this)
        this.onUsernameTyping = this.onUsernameTyping.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleSubmit(event) {
        event.preventDefault()
        if(this.props.onLogin) {
            this.props.onLogin(this.state.username, this.state.password)
        }
    }

    onUsernameTyping(event) {
        const newUsername = event.target.value
        const valid = this.isFormValid(newUsername, this.state.password)
        this.setState({
            username: newUsername,
            formValid: valid
        })
    }

    onPasswordTyping(event) {
        const password = event.target.value
        const valid = this.isFormValid(this.state.username, password)
        this.setState({
            password: password,
            formValid: valid
        })
    }

    isFormValid(username, password) {
        return username && password
    }
    render() {
        return (
            <form className='login-form' onSubmit={this.handleSubmit}>
                <input placeholder='Username or email' value={this.state.username} onChange={this.onUsernameTyping}/>
                <input placeholder='password' type='password' value={this.state.password} onChange={this.onPasswordTyping}/>
                <button className='button login-button' disabled={!this.state.formValid}>
                    Login
                </button>
            </form>
        )
    }
}

export default LoginForm

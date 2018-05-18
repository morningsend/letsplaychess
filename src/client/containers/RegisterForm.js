import React from 'react'
import PropTypes from 'prop-types'
import { RegisterApi } from '../api'

function debounce(func, delay) {
    let timeout
    return () => {
        const context = this
        const args = arguments
        var later = () => {
            timeout = null;
            func.apply(context, args)
        }
        const callNow = !timeout
        clearTimeout(timeout)
        timeout = setTimeout(later, delay)
        if(callNow) {
            func.apply(context, args)
        }
    }
}
export class RegisterForm extends React.Component {
    static propTypes = {
        enabled: PropTypes.bool,
        onRegister: PropTypes.func,
    }

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            email: '',
            password: '',
            valid: false,
            usernameExist: false,
        }
        this.onUsernameChange = this.onUsernameChange.bind(this)
        this.onEmailChange = this.onEmailChange.bind(this)
        this.onPasswordChange = this.onPasswordChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.queryUserAvailable = debounce(this.queryUserAvailable.bind(this), 300)
    }

    queryUserAvailable() {
        RegisterApi.isUsernameAvailable(this.state.username)
            .then(result => {
                console.log('query result', result)
                this.setState({
                    usernameExist: !result,
                    querying: false,
                })
            })
            .catch(error => {})
    }
    handleSubmit(event) {
        event.preventDefault()
        const { username, email, password } = this.state
        if(this.props.onRegister) {
            this.props.onRegister(username, email, password)
        }
    }
    isFormValid(username, email, password) {
        return username && email && password
    }
    onUsernameChange(event) {
        const username = event.target.value
        this.setState({
            username: username,
            valid: this.isFormValid(username, this.state.email, this.state.password)
        })
        if(username){
            this.setState({
                querying: true,
            })
            this.queryUserAvailable()
        }
    }
    onEmailChange(event) {
        const email = event.target.value
        this.setState({
            email: email,
            valid: this.isFormValid(this.state.username, email, this.state.password)
        })
    }
    onPasswordChange(event) {
        const password = event.target.value
        this.setState({
            password: password,
            valid: this.isFormValid(this.state.username, this.state.email, password)
        })
    }
    render() {
        return (
            <form className='register-form' onSubmit={this.handleSubmit}>
                <input placeholder='Username' value={this.state.username} onChange={this.onUsernameChange} />
                {
                    !this.state.querying && this.state.username ?
                    (
                        this.state.usernameExist
                        ? <p className='message'>Username '{this.state.username}' already exists.</p> 
                        : <p className='message'>Username '{this.state.username}' is available</p>
                    )
                    : null
                }
                <input placeholder='Email' value={this.state.email} onChange={this.onEmailChange} />
                <input placeholder='password' type='password' value={this.state.password} onChange={this.onPasswordChange} />
                <button className='button register-button' disabled={!this.state.valid}>
                    Register
                </button>

            </form>
        )
    }
}

export default RegisterForm

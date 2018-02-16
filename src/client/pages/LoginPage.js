import React from 'react'
import PropTypes from 'prop-types'
import { Page } from '../components'

export class LoginPage extends React.Component {
    static propTypes = {
        history: PropTypes.object.isRequired,
    }
    constructor(props, context) {
        super(props, context)
        this.state = {
            loggedIn: false,
        }
        this.doLogin = this.doLogin.bind(this)
    }
    doLogin(e) {
        e.preventDefault()
        this.props.history.push('/account')
    }
    render() {
        return (
            <Page>
                <h1>login page</h1>
                <p>You are { this.state.loggedIn ? '' : 'not'} logged in</p>
                <form onSubmit={this.doLogin}>
                    <input placeholder='email' />
                    <input placeholder='password' type='password' />
                    <button onClick={this.doLogin}>Login</button>
                </form>
            </Page>
        )
    }
}

export default LoginPage

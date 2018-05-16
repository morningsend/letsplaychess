import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { LoginForm } from '../containers'
import { Page, Header, Content } from '../components'
import { userLogin } from '../actions/authen'

export class HomePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.handleLogin = this.handleLogin.bind(this)
    }
    handleLogin(username, password) {
        console.log(username, password)
        if(this.props.login) {
            this.props.login(username, password)
        }
    }
    render() {
        return (
            <Page className='page home-page'>
                <Content>
                <div className='sidebar'>
                    <h1 className='page-title'>
                        Let&apos;s Play Chess
                    </h1>
                    <div>
                        <LoginForm onLogin={this.handleLogin} enabled={true} />
                        <Link to='/register' className='register-here-link'>
                          Don&apos;t have an account? Register here.
                        </Link>
                    </div>
                    <div className='guest-button-container'>
                        <Link to='/game' className='button button-primary'>
                            Play As Guest
                        </Link>
                    </div>
                </div>
                </Content>
            </Page>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        login: (username, password) => {
            dispatch(userLogin(username, password))

        }
    }
}

function mapStateToProps(state) {
    return {
        isLoggedIn: state.authen.isLoggedIn,
        loginFailed: false,
        loginFailedMessage: ''
    }
}
export default HomePage

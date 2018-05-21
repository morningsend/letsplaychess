import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { LoginForm } from '../containers'
import { Page, Header, Content } from '../components'
import { userLogin, userLoginSucceeded, userLoginFailed } from '../actions/authen'
import { AuthenApi, UserApi } from '../api'
import { getUserFinished } from '../actions/user';

const parseQueryString = (str) => {
    let params = {}
    const keyValues = str.split('&')
    for(let i = 0; i < keyValues.length; i++) {
        let temp = (keyValues[i] && keyValues[i].split('=') || null)
        if(temp) {
            params[decodeURIComponent(temp[0])] = decodeURIComponent(temp[1])
        }
    }
    return params
}

class HomePage extends React.Component {
    static propTypes = {
        history: PropTypes.object
    }
    constructor(props) {
        super(props)
        this.state = {}
        this.handleLogin = this.handleLogin.bind(this)
        this.redirect = '/account'
    }
    handleLogin(username, password) {
        if(this.props.login) {
            this.props.login(username, password)
        }
    }
    componentDidMount() {
        if(this.props.location && this.props.location.search) {
            const queryString = this.props.location.search.substring(1)
            const params = parseQueryString(queryString)
            this.redirect = params['next'] || this.redirect
        }
        console.log(this.redirect)
        if(this.props.isLoggedIn && this.props.history) {
            this.props.history.push(this.redirect)
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.props.isLoggedIn) {
            this.props.history.push(this.redirect)
        }
    }
    /*
    <div className='guest-button-container'>
        <Link to='/game' className='button button-primary'>
            Play As Guest
        </Link>
    </div>
    */
    render() {
        console.log(this.props)
        return (
            <Page className='page home-page'>
                <Content>
                <div className='sidebar'>
                    <div className='page-logo'>
                        
                    </div>
                    <div>
                        <LoginForm onLogin={this.handleLogin} enabled={true} />
                        {
                            this.props.loginFailed
                            ? <p className='error'>{this.props.message}</p>
                            : null
                        }
                        <Link to='/register' className='register-here-link'>
                          Don&apos;t have an account? Register here.
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
            console.log('dispatch userLogin')
            dispatch(userLogin(username, password))
            AuthenApi.login(username, password)
                .then(result => {
                    console.log(result)
                    if(result.success) {
                        return result
                    } else {
                        throw result
                    }
                    
                })
                .then((result)=> {
                    return UserApi
                        .getUser(result.userId, result.token)
                        .then(user => {
                            dispatch(getUserFinished(user))
                            dispatch(userLoginSucceeded(username, result.userId, result.token, result.expiresIn))
                        })
                        .catch(error => {
                            console.log(error)
                            dispatch(userLoginFailed(username, error.messsage))
                        })
                })
                .catch((error) => {
                    console.log(error)
                    dispatch(userLoginFailed(username, error.message))
                })
        },
        alreadLoggedIn: (username, userId, accessToken, expiresIn) => {
            dispatch(userLoginSucceeded(username, userId, accessToken, expiresIn))
        }
    }
}

function mapStateToProps(state) {
    const authen = state.authen
    return {
        isLoggedIn: authen.loggedIn,
        loginFailed: authen.failed,
        message: authen.message,
        userId: authen.userId,
        accessToken: authen.accessToken,
        username: authen.username,
    }
}

const HomePageWithRedux = connect(mapStateToProps, mapDispatchToProps)(HomePage)
export { HomePageWithRedux as HomePage }
export default HomePageWithRedux

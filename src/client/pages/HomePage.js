import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { LoginForm } from '../containers'
import { Page, Header, Content } from '../components'
import { userLogin, userLoginSucceeded, userLoginFailed } from '../actions/authen'
import { AuthenApi } from '../api'

class HomePage extends React.Component {
    static propTypes = {
        history: PropTypes.object
    }
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
    componentDidMount() {
        if(this.props.isLoggedIn && this.props.history) {
            this.props.history.push('/account')
        }
        // debug only
        this.handleLogin('test001', '12345678')
    }

    componentWillUpdate(nextProps, nextState) {
        if(nextProps.isLoggedIn) {
            this.props.history.push('/account')
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
                .then(result=>{
                    console.log(result)
                    if(result.success) {
                        dispatch(userLoginSucceeded(username, result.userId, result.token, result.expiresIn))
                    } else {
                        console.log(result)    
                        dispatch(userLoginFailed(username, result.messsage))    
                    }
                })
                .catch((error) => {
                    dispatch(userLoginFailed(username, error.messsage))
                })
        }
    }
}

function mapStateToProps(state) {
    const authen = state.authen
    return {
        isLoggedIn: authen.loggedIn,
        loginFailed: authen.failed,
        message: authen.message,

    }
}

const HomePageWithRedux = connect(mapStateToProps, mapDispatchToProps)(HomePage)
export { HomePageWithRedux as HomePage }
export default HomePageWithRedux

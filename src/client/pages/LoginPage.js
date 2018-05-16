import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Page } from '../components'

export class LoginPage extends React.PureComponent {
    static propTypes = {
        history: PropTypes.object.isRequired,
    }
    constructor(props) {
        super(props)
        this.doLogin = this.doLogin.bind(this)
    }
    doLogin(e) {
        console.log(e)
        e.preventDefault()
        e.stopPropagation()
        //this.props.history.push('/account')
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
function mapStateToProps(state) {
    return {
        loggedIn: state.authen.loggedIn,

    }
}
function mapDispatchToProps(dispatch) {

}
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Page } from '../components'
import { clearState } from '../localStorage'
import { userLogout } from '../actions/authen'
class LogoutPage extends React.PureComponent {
    static propTypes = {
        history: PropTypes.object.isRequired,
    }
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        const history = this.props.history
        clearState()
        this.props.logout 
            && this.props.logout()
        setTimeout( () =>{
            history.replace('/')
        }, 2000)
    }

    render() {
        return (
            <Page className='page logout-page'>
                <h1>Logging Out...</h1>            
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
    return {
        logout: () => {
            dispatch(userLogout())
        }
    }
}
const LogoutPageWithRedux = connect(mapStateToProps, mapDispatchToProps)(LogoutPage)
export { LogoutPageWithRedux as LogoutPage }
export default LogoutPageWithRedux
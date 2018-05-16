import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getUser, getUserFinished } from '../actions/user'
import { ProfileBar, GameHistory } from '../containers'
import { UserApi } from '../api'
import { Avatar, Page, Content, Header, HeaderItem, PopUpMenu, MenuItem } from '../components'

class AccountPage extends React.Component {
    static propTypes = {}
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        return (
            <Page className='page account-page'>
                <Header>
                    <h2 className='title'>Let&apos;s Play Chess</h2>
                    <HeaderItem>
                        <PopUpMenu button={
                            <button>
                                <Avatar name='Jonsnow283ac' img='' />
                            </button>
                        }>
                            <MenuItem>
                                <p>Game History (Last 7 days)</p>
                            </MenuItem>
                            <MenuItem><Link to='/account'>Your Acount</Link></MenuItem>
                            <MenuItem><Link to='/account'>Achievements</Link></MenuItem>
                            <MenuItem><Link to='/account'>Settings</Link></MenuItem>

                        </PopUpMenu>
                    </HeaderItem>
                </Header>
                <Content className='account-page-content'>
                    <ProfileBar />
                    <GameHistory />
                </Content>

            </Page>
        )
    }
}

function mapStateToProps(state) {
    const user = state.user
    const authen = state.authen
    return {
        user,
        userId: user.userId || authen.userId,
        accessToken: authen.accessToken,
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        getUser: () => {
            const { userId, accessToken } = ownProps
            dispatch(getUser(ownProps.userId))
            UserApi.getUser(userId, accessToken)
                .then(user => {
                    dispatch(getUserFinished(user))
                })
                .catch(error => {
                    dispatch(getUserFailed(error))
                })
        }
    }
}

const AccountPageWithRedux = connect(mapStateToProps, mapDispatchToProps)(AccountPage)

export { AccountPageWithRedux as AccountPage}
export default AccountPageWithRedux

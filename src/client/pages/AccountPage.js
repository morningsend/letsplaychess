import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getUser, getUserFinished, getUserFailed } from '../actions/user'
import { newMatch } from '../actions/match'
import { ProfileBar, GameHistory } from '../containers'
import { UserApi } from '../api'
import { Avatar, Page, Content, Header, HeaderItem, PopUpMenu, MenuItem } from '../components'

const imageUrl = require('../assets/images/avatars/male.png')
class AccountPage extends React.Component {
    static propTypes = {
        getUser: PropTypes.func,
        user: PropTypes.object,
    }
    constructor(props, context) {
        super(props, context)
        console.log(props.user)

        this.state = {
            selectedSidebarItem: 0,
        }
        this.childPageTitles = [
            'Games Replay',
            'Settings',
        ]

        this.handleSelectItem = this.handleSelectItem.bind(this)
        this.handleReplayClick = this.handleReplayClick.bind(this)
        this.handleNewGame = this.handleNewGame.bind(this)
    }

    componentDidMount() {
        const {userId, accessToken, getUser } = this.props
        if(!userId && getUser){
            getUser(userId, accessToken)
        }
        //this.props.history.push('/game')
    }
    handleSelectItem(index) {
        this.setState({
            selectedSidebarItem: index,
        })
    }
    handleReplayClick(matchId) {
        console.log(matchId)
        if(matchId && this.props.history) {
            this.props.history.push('/replay/' + matchId)
        }
    }
    handleNewGame() {
        this.props.newMatch()
        this.props.history && 
            this.props.history.push('/game')
        
    }
    render() {
        const { user } = this.props
        console.log(user)
        const matches = [
            {
                matchId: '12314',
                outcome: 1,
                result: +12,
                opponent: "JohnSmith1982",
                date: "2018-03-20",
                gameid: 646464,
            },
            {
                matchId: '384902384',
                outcome: -1,
                result: -20,
                opponent: "JohnSmith1982",
                date: "2018-03-20",
                gameid: 646464,
            },
        ]
        const childPages = [
            <GameHistory matches={matches || []} onMatchReplayClick={this.handleReplayClick}/>,
            <div>Settings</div>
        ]
        return (
            <Page className='page account-page'>
                <Header>
                    <h2 className='title'>Let&apos;s Play Chess</h2>
                    <HeaderItem>
                        <PopUpMenu button={
                            <button>
                                <Avatar name={user.username} img={imageUrl} ranking={user.ranking}/>
                            </button>
                        }>
                            <MenuItem>
                                <p>Game History (Last 7 days)</p>
                            </MenuItem>
                            <MenuItem><Link to='/account'>Your Acount</Link></MenuItem>
                            <MenuItem><Link to='/account'>Achievements</Link></MenuItem>
                            <MenuItem><Link to='/account'>Settings</Link></MenuItem>
                            <MenuItem><Link to='/logout'>Log Out</Link></MenuItem>
                        </PopUpMenu>
                    </HeaderItem>
                </Header>
                <Content className='account-page-content'>
                    <ProfileBar
                        user={user}
                        menuItems={this.childPageTitles}
                        selectedIndex={this.state.selectedSidebarItem}
                        onSelectMenu={this.handleSelectItem}
                        onNewGame={this.handleNewGame}
                    />
                    { childPages[this.state.selectedSidebarItem] }
                </Content>
            </Page>
        )
    }
}

function mapStateToProps(state) {
    const user = state.user
    const authen = state.authen
    return {
        user: user.user,
        userId: user.userId || authen.userId,
        accessToken: authen.accessToken,
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        getUser: (userId, accessToken) => {
            dispatch(getUser(userId))
            console.log('getUser')
            console.log(ownProps)
            UserApi.getUser(userId, accessToken)
                .then(user => {
                    dispatch(getUserFinished(user))
                })
                .catch(error => {
                    dispatch(getUserFailed(error))
                })
        },
        newMatch: () => {
            dispatch(newMatch())
        }
    }
}

const AccountPageWithRedux = connect(mapStateToProps, mapDispatchToProps)(AccountPage)

export { AccountPageWithRedux as AccountPage}
export default AccountPageWithRedux

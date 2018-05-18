import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { SocketChessGame, SocketInstantMessenger, ChessGame } from '../containers'
import { Avatar, Page, Content, Header, HeaderItem, PopUpMenu, MenuItem, Overlay, Modal, LoadingIcon } from '../components'
import { Tab, TabView, ChessMovesViewer } from '../components'
import { MatchApi } from '../api/MatchApi'
import { SocketContextProvider, SocketContextConsumer } from '../realtime'
import { findMatch, matchFound, matchMakingTimeout, findMatchRequestError } from '../actions/match'

class GamePage extends React.Component {
    static propTypes = {
        hasMatch: PropTypes.bool,
        opponentId: PropTypes.string,
        colour: PropTypes.string,
        findingMatch: PropTypes.bool,
        errorMessage: PropTypes.string,
        userId: PropTypes.string,
        username: PropTypes.string,
        avatarImage: PropTypes.string,
        match: PropTypes.object,
        matchId: PropTypes.string,
        joinToken: PropTypes.string,
        accessToken: PropTypes.string,
    }

    constructor(props, context) {
        super(props, context)
        this.onMoveListUpdate = this.onMoveListUpdate.bind(this)
        this.state = {
            moveList: []
        }

        this.onFindOpponentButtonClick = this.onFindOpponentButtonClick.bind(this)
    }
    onMoveListUpdate(moveList) {
        this.setState({
            moveList: moveList || []
        })
    }
    componentDidMount() {

    }
    componentWillUnmount() {

    }
    componentWillUpdate(nextProps, nextState) {

    }
    onFindOpponentButtonClick() {
        console.log('find opponent')
        if(this.props.findMatch){
            this.props.findMatch(this.props.userId, this.props.accessToken)
        }
    }
    render() {
        const { findingMatch, errorMessage } = this.props
        console.log(this.props.myPlayerColour)
        return (
            <SocketContextProvider>
                <Page className='page game-page'>
                    <Overlay visible={!this.props.hasMatch}>
                        {
                            findingMatch ? 
                            <Modal>
                                <LoadingIcon />
                                <p>Matching you with other players...</p>
                            </Modal>
                            : null
                        }
                        {
                            (!findingMatch) ?
                            <Modal>
                                <p>15 Minutes Blitz Game</p>
                                <button className="button" onClick={this.onFindOpponentButtonClick}>Find Opponent</button>
                                <p>{errorMessage || ''}</p>
                            </Modal>
                            : null
                        }
                    </Overlay>
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
                    <Content className='game-page-content'>
                        <div className='game-wrapper'>
                            {
                                this.props.hasMatch ? 
                                <SocketChessGame
                                    onMoveListUpdate={this.onMoveListUpdate}
                                    showPlaceholder={!this.hasMatch}
                                    whitePlayer={{
                                        name: 'jonsnow203',
                                        rating: 1200
                                    }}
                                    blackPlayer={{
                                        name: 'daenerys<3',
                                        rating: 1198,
                                    }}
                                    thisPlayerColour={this.props.myPlayerColour}
                                    matchId={this.props.matchId}
                                    matchJoinToken={this.props.joinToken}
                                    userId={this.props.userId}
                                />
                                : <ChessGame.Placeholder />
                            }
                        </div>
                        <TabView className='tabview' barItems={['Messages', 'Notation']}>
                            <SocketInstantMessenger enabled={this.props.hasMatch} />
                            <ChessMovesViewer moves={this.state.moveList}/>
                        </TabView>
                    </Content>
                </Page>
            </SocketContextProvider>
        )
    }
}

function mapStateToProps(state) {
    const match = state.match
    const authen = state.authen
    const user = state.user
    console.log(match)
    console.log(authen)
    return {
        hasMatch: match.opponentId ? true : false,
        opponentId: match.opponentId,
        matchId: match.matchId,
        joinToken: match.joinToken,
        myPlayerColour: match.myPlayerColour,
        findingMatch: match.findingMatch,
        accessToken: authen.accessToken,
        errorMessage: match.errorMessage,
        userId: authen.userId,
        username: user.username,
        avatarImage: user.profile.avatarUrl,
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        findMatch: (userId, accessToken) => {
            dispatch(findMatch(userId, new Date().getTime()))
            MatchApi.findMatch(userId, accessToken)
                .then(match => {
                    if(match.success) 
                        dispatch(matchFound(userId, match))
                    else {
                        dispatch(matchMakingTimeout())
                    }
                })
                .catch(error => {
                    dispatch(findMatchRequestError(error))
                })
        },
        matchFound: (userId, opponentId, matchId, joinToken, match, colour) => {
            dispatch(matchFound(userId, opponentId, matchId, joinToken, colour))
        },
        timeout: () => {
            dispatch(matchMakingTimeout())
        }
    }
}
const GamePageWithRedux = connect(mapStateToProps, mapDispatchToProps)(GamePage)
export { GamePageWithRedux as GamePage }
export default GamePageWithRedux

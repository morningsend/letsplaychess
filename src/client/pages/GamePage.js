import React from 'react'
import { Link } from 'react-router-dom'
import { ChessGame, InstantMessenger } from '../containers'
import { Avatar, Page, Content, Header, HeaderItem, PopUpMenu, MenuItem, Overlay, Modal, LoadingIcon } from '../components'
import { Tab, TabView } from '../components'
import { ChessMovesViewer } from '../containers/ChessMovesViewer';
import { SocketContextProvider } from '../realtime'

export class GamePage extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.onMoveListUpdate = this.onMoveListUpdate.bind(this)
        this.state = {
            moveList: []
        }
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
    render() {
        return (
            <SocketContextProvider>
                <Page className='page game-page'>
                    <Overlay visible={false}>
                        <Modal>
                            <LoadingIcon />
                            <p>Matching you with other players...</p>
                        </Modal>
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
                            <ChessGame onMoveListUpdate={this.onMoveListUpdate} />
                        </div>
                        <TabView className='tabview' barItems={['Messages', 'Notation']}>
                            <InstantMessenger />
                            <ChessMovesViewer moves={this.state.moveList}/>
                        </TabView>
                    </Content>
                </Page>
            </SocketContextProvider>
        )
    }
}

export default GamePage

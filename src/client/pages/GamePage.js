import React from 'react'
import { Link } from 'react-router-dom'
import { ChessGame, InstantMessenger } from '../containers'
import { Avatar, Page, Content, Header, HeaderItem, PopUpMenu, MenuItem, Overlay, Modal, LoadingIcon } from '../components'
import { Tab, TabView } from '../components'
import { ChessMovesViewer } from '../containers/ChessMovesViewer';
export class GamePage extends React.Component {
    render() {
        return (
            <Page className='page game-page'>
                <Overlay visible={false}>
                    <Modal>
                        <LoadingIcon />
                        <p>Matching you with other players...</p>
                    </Modal>
                </Overlay>
                <Header>
                    <h1 className='title'>Let&apos;s Play Chess</h1>
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
                        <ChessGame />
                    </div>
                    <TabView barItems={['Messages', 'Notation']}>
                        <InstantMessenger />
                        <ChessMovesViewer />
                    </TabView>
                </Content>
            </Page>
        )
    }
}

export default GamePage

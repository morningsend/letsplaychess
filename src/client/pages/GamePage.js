import React from 'react'
import { Link } from 'react-router-dom'
import { ChessGame, InstantMessenger } from '../containers'
import { Avatar, Page, Content, Header, HeaderItem, PopUpMenu, MenuItem } from '../components'

export class GamePage extends React.Component {
    render() {
        return (
            <Page className='page game-page'>
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
                    <InstantMessenger />
                </Content>
            </Page>
        )
    }
}

export default GamePage

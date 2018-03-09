import React from 'react'
import { Link } from 'react-router-dom'
import { ChessGame, InstantMessenger } from '../containers'
import { Avatar, Page, Content, Header, HeaderItem, PopUpMenu, MenuItem } from '../components'

export class GamePage extends React.Component {
    render() {
        return (
            <Page className='page game-page'>
                <Header>
                    <h1 className='title'>Let's Play Chess</h1>
                    <HeaderItem>
                        <PopUpMenu button={
                            <button>
                                <Avatar name='Jonsnow283ac' img='' />
                            </button>
                        }>
                            <MenuItem><Link to='/account'>Goto Acount</Link></MenuItem>
                        </PopUpMenu>
                    </HeaderItem>
                </Header>
                <Content className='game-page-content'>
                    <ChessGame />
                    <InstantMessenger />
                </Content>
            </Page>
        )
    }
}

export default GamePage

import React from 'react'
import { Link } from 'react-router-dom'
import { ChessGame, InstantMessenger } from '../containers'
import { Page, Content, Header, PopUpMenu, MenuItem } from '../components'

export class GamePage extends React.Component {
    render() {
        return (
            <Page className='page game-page'>
                <Header>
                    <h1>Game Page</h1>
                    <div>
                        <Link to='/account'>Goto Acount</Link>
                        <PopUpMenu>
                            <MenuItem>Account</MenuItem>
                        </PopUpMenu>
                    </div>
                </Header>
                <Content>
                    <ChessGame />
                    <InstantMessenger />
                </Content>
            </Page>
        )
    }
}

export default GamePage

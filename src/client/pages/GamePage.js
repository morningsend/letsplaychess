import React from 'react'
import { Link } from 'react-router-dom'
import { ChessGame, InstantMessenger } from '../containers'
import { Page, Content, Header } from '../components'

export class GamePage extends React.Component {
    render() {
        return (
            <Page className='page game-page'>
                <Header>
                    <h1>Game Page</h1>
                    <Link to='/account'>Goto Acount</Link>
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

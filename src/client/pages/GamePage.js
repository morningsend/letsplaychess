import React from 'react'
import { Link } from 'react-router-dom'
import { ChessGame, InstantMessenger } from '../containers'
import { Page } from '../components'

export class GamePage extends React.Component {
    render() {
        return (
            <Page className='page game-page'>
                <h1>Game Page</h1>
                <Link to='/account'>Goto Acount</Link>
                <ChessGame />
                <InstantMessenger />
            </Page>
        )
    }
}

export default GamePage

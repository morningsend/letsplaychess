import React from 'react'
import { ChessEngine, Move, MoveTypes } from '../../chess'
import { Board } from '../components/Board'
import { PlayerBadge } from '../components/PlayerBadge'

export class ChessGame extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            playerWhite: {
                name: 'jj',
                rating: 1200,
            },
            playerBlack: {
                name: 'bb',
                rating: 1243,
            },
            chessEngine: new ChessEngine(),
            movesMade: 0,
        }
        this.handleMakeMove = this.handleMakeMove.bind(this)
    }
    handleMakeMove(piece, columnTo, rowTo) {
        if (piece && columnTo && rowTo) {
            const move = new Move(
                piece, 
                MoveTypes.Normal,
                {
                    column: columnTo,
                    row: rowTo
                },
                null
            )
            if (this.state.chessEngine.makeMove(move)) {
                this.setState({ movesMade: this.state.movesMade + 1 })
            }
        }
    }
    render() {
        return (
            <div className='chess-game-container'>
                <PlayerBadge player={this.state.playerWhite} />
                <Board
                    board={this.state.chessEngine.board}
                    onMakeMove={this.handleMakeMove}
                    />
                <PlayerBadge player={this.state.playerBlack} />
                {this.state.movesMade}
            </div>
        )
    }
}

export default ChessGame

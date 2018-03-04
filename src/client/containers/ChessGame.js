import React from 'react'
import { ChessEngine, Move, MoveTypes, GameStateMachine, GameStatus } from '../../chess'
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
            game: GameStateMachine.newGame({ duration: 900 }),
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
            if (this.state.game.onMove(move)) {
                this.setState({ movesMade: this.state.movesMade + 1 })
            }
        }
    }
    render() {
        return (
            <div className='chess-game-container'>
                <PlayerBadge player={this.state.playerWhite} />
                <Board
                    moveEnabled={ this.state.game.gameStatus !== GameStatus.End }
                    board={this.state.game.chessEngine.board}
                    onMakeMove={this.handleMakeMove}
                    />
                <PlayerBadge player={this.state.playerBlack} />
                {this.state.movesMade}
            </div>
        )
    }
}

export default ChessGame

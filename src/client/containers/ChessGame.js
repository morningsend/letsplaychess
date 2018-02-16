import React from 'react'
import { ChessEngine } from '../../chess/ChessEngine'
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
        console.log('handle on make move', piece, columnTo, rowTo)
        console.log('handle on make move', this.state.chessEngine.board)
        if (piece && columnTo && rowTo) {
            if (this.state.chessEngine.makeMove(piece, columnTo, rowTo)) {
                this.setState({ movesMade: this.state.movesMade + 1 })
                console.log(this.state.chessEngine.board)
            }
        }
    }
    render() {
        return (
            <div>
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

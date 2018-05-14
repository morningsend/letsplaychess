import React from 'react'
import PropTypes from 'prop-types'
import { ChessEngine, Move, MoveTypes, GameStateMachine, GameStatus, PlayerColours } from '../../chess'
import { Board, PlayerBadge, ChessClock } from '../components'

export class ChessGame extends React.Component {
    static propTypes = {
        thisPlayerColour: PropTypes.string,
        onMoveListUpdate: PropTypes.func,
    }

    static defaultProps = {
        thisPlayerColour: PlayerColours.White,
        onMoveListUpdate: () => {}
    }
    constructor(props) {
        super(props)

        this.state = {
            playerWhite: {
                name: 'jonsnow203',
                rating: 1200,
            },
            playerBlack: {
                name: 'daenerys<3',
                rating: 1198,
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
                this.props.onMoveListUpdate(this.state.game.moves)
            }
        }
    }
    render() {
        const { thisPlayerColour } = this.props
        return (
            <div className='chess-game-container'>
                <div className='chess-game-row'>
                    <div className='spacer'></div>
                    <PlayerBadge player={this.state.playerBlack} />
                    <ChessClock durationInSeconds={900} countingDown={false} />
                </div>
                <Board
                    moveEnabled={ this.state.game.gameStatus !== GameStatus.End }
                    board={this.state.game.chessEngine.board}
                    onMakeMove={this.handleMakeMove}
                    thisPlayerColour={this.props.thisPlayerColour}
                    />
                <div className='chess-game-row'>
                    <div className='spacer'></div>
                    <PlayerBadge player={this.state.playerWhite}/>
                    <ChessClock durationInSeconds={900} countingDown={true} />
                </div>
                <span style={{visibility: 'hidden'}}>{this.state.movesMade}</span>
            </div>
        )
    }
}

export default ChessGame

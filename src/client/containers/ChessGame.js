import React from 'react'
import PropTypes from 'prop-types'
import { ChessEngine, Move, MoveTypes, GameStateMachine, GameStatus, PlayerColours, ChessBoard } from '../../chess'
import { Board, PlayerBadge, ChessClock } from '../components'
import { SocketContextConsumer } from '../realtime';

export class ChessGame extends React.Component {
    static propTypes = {
        thisPlayerColour: PropTypes.string,
        onMoveListUpdate: PropTypes.func,
        thisPlayerColour: PropTypes.string,
        playerBlack: PropTypes.object,
        playerWhite: PropTypes.object,
    }

    static defaultProps = {
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
        console.log(thisPlayerColour)
        return (
            <div className='chess-game-container'>
                <div className='chess-game-row'>
                    <div className='spacer'></div>
                    <PlayerBadge player={thisPlayerColour === PlayerColours.White ? this.state.playerBlack : this.state.playerWhite} />
                    <ChessClock durationInSeconds={900} countingDown={false} />
                </div>
                <Board
                    moveEnabled={ this.state.game.gameStatus !== GameStatus.End }
                    board={this.state.game.chessEngine.board}
                    onMakeMove={this.handleMakeMove}
                    thisPlayerColour={thisPlayerColour}
                    />
                <div className='chess-game-row'>
                    <div className='spacer'></div>
                    <PlayerBadge player={thisPlayerColour === PlayerColours.White ? this.state.playerWhite : this.state.playerBlack} />
                    <ChessClock durationInSeconds={900} countingDown={true} />
                </div>
                <span style={{visibility: 'hidden'}}>{this.state.movesMade}</span>
            </div>
        )
    }
}
export const ChessGamePlaceholder = (props) => (
<div className='chess-game-container' {...props}>
    <div className='chess-game-row'>
        <div className='spacer'></div>
        <PlayerBadge.Placeholder />
    </div>
    <Board
        board={ChessBoard.initialBoard()}
    />
    <div className='chess-game-row'>
        <div className='spacer'></div>
        <PlayerBadge.Placeholder />
    </div>
</div>
)

ChessGame.Placeholder = ChessGamePlaceholder

export const SocketChessGame = (props) => (
    <SocketContextConsumer>
    {
        contextProps => <ChessGame {...props} {...contextProps}/>
    }
    </SocketContextConsumer>
)

export default ChessGame

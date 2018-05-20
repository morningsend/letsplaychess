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
        whitePlayer: PropTypes.object,
        blackPlayer: PropTypes.object,
        gameClient: PropTypes.object,
        matchId: PropTypes.string,
        matchJoinToken: PropTypes.string,
        userId: PropTypes.string,
        onMatchEnd: PropTypes.string,
    }
    componentDidMount() {
        if(!this.props.gameClient) {
            return
        }
        this.props.gameClient.reset(this.props.match)
    }
    static defaultProps = {
        onMoveListUpdate: () => {}
    }
    constructor(props) {
        super(props)

        this.state = {
            game: GameStateMachine.newGame({ duration: 900 }),
            movesMade: 0,
            gameRunning: false,
            lastMove: null,
            offeredDraw: false,
            opponentOfferedDraw: false,
            whiteTimeRemainingSeconds: 900,
            blackTimeRemainingSeconds: 900,
        }
        this.handleMakeMove = this.handleMakeMove.bind(this)
        this.handlePlayersReady = this.handlePlayersReady.bind(this)
        this.handleOpponentResign = this.handleOpponentResign.bind(this)
        this.handleOpponentMove = this.handleOpponentMove.bind(this)
        this.handleOpponentOfferDraw = this.handleOpponentOfferDraw.bind(this)
        
        this.whitePlayerClockTicker = null
        this.blackPlayerClockTicker = null
        this.toggleClocks = this.toggleClocks.bind(this)

        this.startWhiteClock = this.startWhiteClock.bind(this)
        this.whiteClockTick = this.whiteClockTick.bind(this)
        this.stopWhiteClock = this.stopWhiteClock.bind(this)

        this.startBlackClock = this.startBlackClock.bind(this)
        this.stopBlackClock = this.stopBlackClock.bind(this)
        this.blackClockTick = this.blackClockTick.bind(this)

        this.clockTickInterval = 500

        this.handleAcceptDrawClick = this.handleAcceptDrawClick.bind(this)
        this.handleOfferDrawClick = this.handleOfferDrawClick.bind(this)
        this.handleResignClick = this.handleResignClick.bind(this)
    }
    whiteClockTick(){
        this.setState({
            whiteTimeRemainingSeconds: this.state.whiteTimeRemainingSeconds - this.clockTickInterval / 1000
        })
    }
    blackClockTick() {
        this.setState({
            blackTimeRemainingSeconds: this.state.blackTimeRemainingSeconds - this.clockTickInterval / 1000
        })
    }
    startWhiteClock() {
        if(!this.whitePlayerClockTicker)
            this.whitePlayerClockTicker = setInterval(this.whiteClockTick, this.clockTickInterval)
    }
    stopWhiteClock() {
        if(this.whitePlayerClockTicker) {
            clearInterval(this.whitePlayerClockTicker)
            this.whitePlayerClockTicker = null
        }
    }
    startBlackClock() {
        if(!this.blackPlayerClockTicker)
            this.blackPlayerClockTicker = setInterval(this.blackClockTick, this.clockTickInterval)

    }
    stopBlackClock() {
        if(this.blackPlayerClockTicker){
            clearInterval(this.blackPlayerClockTicker)
            this.blackPlayerClockTicker = null
        }
    }
    toggleClocks() {
        const nextTurnPlayerColour = this.state.game.nextTurn
        if(nextTurnPlayerColour === PlayerColours.White) {
            this.stopBlackClock()
            this.startWhiteClock()
        }else if(nextTurnPlayerColour === PlayerColours.Black) {
            this.stopWhiteClock()
            this.startBlackClock()
        }
    }
    handlePlayersReady() {
        this.setState({
            gameRunning: true,
        })
        this.startWhiteClock()
    }
    handleOpponentOfferDraw() {
        this.setState({
            opponentOfferedDraw: true,
        })
    }
    handleOpponentResign() {
        console.log('opponent resigned')
        this.stopBlackClock()
        this.stopWhiteClock()
        this.props.onMatchEnd &&
            this.props.onMatchEnd()
    }

    handleOpponentMove(from, to) {
        const { column, row } = from
        const piece = this.state.game.chessEngine.board.pieceAt(column, row)
        if (piece && to.column && to.row) {
            const move = new Move(
                piece,
                MoveTypes.Normal,
                to,
                null
            )
            if (this.state.game.onMove(move)) {
                this.setState({
                    movesMade: this.state.movesMade + 1,
                    lastMove: {
                        from,
                        to,
                    }
                })
                this.props.onMoveListUpdate(this.state.game.moves)
            }
            this.toggleClocks()
        }
    }

    componentDidMount() {
        
        if(!this.props.gameClient) {
            console.log('game client is null')
            return
        }
        this.props.gameClient.reset()
        console.log('chessgame' ,this.props)
        const { userId, matchId, matchJoinToken } = this.props

        this.setupGameClient(this.props.gameClient)
        
        this.props.gameClient.joinGame(
            userId,
            matchId,
            matchJoinToken
        )
        //this.whitePlayerClockInterval = setInterval()
        //this.blackPlayerClockInterval = setInterval()
    }
    componentWillUnmount() {
        if(!this.props.gameClient) {
            return
        }
        this.props.gameClient.cleanUpCallbacks()
        this.stopBlackClock()
        this.stopWhiteClock()
    }
    setupGameClient(gameClient) {
        gameClient.onPlayersReady(this.handlePlayersReady)
        gameClient.onOpponentResign(this.handleOpponentResign)
        gameClient.onOpponentMakeMove(this.handleOpponentMove)
        gameClient.onOpponentResign(this.handleOpponentResign)
        gameClient.onOpponentOfferDraw(this.handleOpponentOfferDraw)
    }

    handleMakeMove(piece, columnTo, rowTo) {
        if (piece && columnTo && rowTo) {
            let from = { ...piece.position }
            let to = { column: columnTo, row: rowTo }

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
                this.setState({
                    movesMade: this.state.movesMade + 1,
                    lastMove: {
                        from,
                        to,
                    }
                })
                this.props.onMoveListUpdate(this.state.game.moves)
            }
            this.props.gameClient &&
                this.props.gameClient.makeMove(from, to)
            this.toggleClocks()
        }
    }

    handleOfferDrawClick() {
        if(this.props.gameClient) {
            this.props.gameClient.offerDraw()
           this.setState({
                offeredDraw: true,
            })
        }
    }
    handleAcceptDrawClick() {

    }
    handleResignClick() {
        this.props.gameClient.resign()
        this.stopBlackClock()
        this.stopWhiteClock()
        this.props.onMatchEnd &&
            this.props.onMatchEnd()
    }
    render() {
        const { thisPlayerColour } = this.props
        const nextTurnPlayerColour = this.state.game.nextTurn

        let thisPlayerTime, otherPlayerTime
        let thisPlayer, otherPlayer
        if(thisPlayerColour === PlayerColours.White) {
            thisPlayerTime = this.state.whiteTimeRemainingSeconds
            otherPlayerTime = this.state.blackTimeRemainingSeconds
            thisPlayer = this.props.whitePlayer
            otherPlayer = this.props.blackPlayer
        } else {
            otherPlayerTime = this.state.whiteTimeRemainingSeconds
            thisPlayerTime = this.state.blackTimeRemainingSeconds
            otherPlayer = this.props.whitePlayer
            thisPlayer = this.props.blackPlayer
        }
        return (
            <div className='chess-game-container'>
                <div className='chess-game-row'>
                    <div className='spacer'></div>
                    <PlayerBadge player={otherPlayer} />
                    <ChessClock durationInSeconds={otherPlayerTime} countingDown={nextTurnPlayerColour !== thisPlayerColour && this.state.gameRunning} />
                </div>
                <Board
                    moveEnabled={ this.state.game.gameStatus !== GameStatus.End }
                    board={this.state.game.chessEngine.board}
                    onMakeMove={this.handleMakeMove}
                    thisPlayerColour={thisPlayerColour}
                    highlightedMove={this.state.lastMove}
                    />
                <div className='chess-game-row'>
                    <div className='spacer'></div>
                    <PlayerBadge player={thisPlayer} />
                    <ChessClock durationInSeconds={thisPlayerTime} countingDown={nextTurnPlayerColour === thisPlayerColour && this.state.gameRunning} />
                </div>
                <div className='chess-game-row'>
                    <button className='button' onClick={this.handleOfferDrawClick} disabled={this.state.offeredDraw || this.state.opponentOfferedDraw}>Offer Draw</button>
                    <button className='button' onClick={this.handleAcceptDrawClick} disabled={!this.state.opponentOfferedDraw}>Accept Draw</button>
                    <button className='button' onClick={this.handleResignClick}>Resign</button>
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

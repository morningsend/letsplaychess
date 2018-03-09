import React from 'react'
import PropTypes from 'prop-types'
import { PlayerColours } from '../../chess/'
import { Piece } from './Piece'

export class Board extends React.Component {
    static propTypes = {
        playerColourPOV: PropTypes.string,
        board: PropTypes.object,
        onMakeMove: PropTypes.func,
        moveEnabled: PropTypes.bool
    }
    static defaultProps = {
        playerColourPOV: PlayerColours.White,
        board: null,
        onMakeMove: null,
        moveEnabled: true
    }

    static renderEmptyBoard() {
        return (
            <div>loading...</div>
        )
    }
    constructor(props) {
        super(props)
        this.state = {
            selectedPiece: null,
        }
        this.squareSize = 64
        this.handlePieceClick = this.handlePieceClick.bind(this)
        this.renderBoard = this.renderBoard.bind(this)
        this.renderPieces = this.renderPieces.bind(this)
        this.boardGraphics = this.renderBoard()
    }

    handlePieceClick(position) {
        if(!this.props.moveEnabled) {
            this.setState({
                selectedPiece: null
            })
            return
        }
        const { column, row } = position
        if (this.state.selectedPiece && this.props.onMakeMove) {
            this
                .props
                .onMakeMove(this.state.selectedPiece, column, row)
            this.setState({ selectedPiece: null })
        } else {
            const piece = this.props.board.pieceAt(column, row)
            this.setState({ selectedPiece: piece })
        }
    }
    renderBoard() {
        console.log('rendering board')
        const board = []
        const { boardWidth, boardHeight } = this.props.board
        for(let i = 0; i < boardWidth; i++) {
            for(let j = 0; j < boardHeight; j++) {
                const colour = ( i + j ) % 2 == 0 ? 'square black' : 'square white'
                board.push(
                    <rect
                        key={i+j}
                        width={this.squareSize}
                        height={this.squareSize}
                        className={colour}
                        x={j * this.squareSize}
                        y={i * this.squareSize}
                    />
                )
            }
        }

        return <g className='chess-board-tiles'>{board}</g>
    }

    renderPieces() {
        const piecesGraphics = []
        const whitePieces = this.props.board.whiteView.thisPlayerPieces
        const blackPieces = this.props.board.whiteView.otherPlayerPieces

        for(let i = 0; i < whitePieces.length; i++) {
            piecesGraphics.push(<Piece key={'white-' + i} piece={whitePieces[i]} size={this.squareSize}/>)
        }

        for(let i = 0; i < blackPieces.length; i++) {
            piecesGraphics.push(<Piece key={'black-' + i} piece={blackPieces[i]} size={this.squareSize}/>)
        }
        return <g>{piecesGraphics}</g>
    }
    render() {
        if (!this.props.board) {
            return this.renderEmptyBoard()
        }
        const { boardWidth, boardHeight } = this.props.board
        const pieces = this.renderPieces()
        console.log(this.boardGraphics)
        return (
            <div className={this.props.playerColourPOV}>
                <svg
                    className='chess-board'
                    width={boardWidth * this.squareSize}
                    height={boardHeight * this.squareSize}>
                    {this.boardGraphics}
                    {pieces}
                </svg>
                {this.state.selectedPiece ? this.state.selectedPiece.kind : null}

            </div>
        )
    }
}

export default Board

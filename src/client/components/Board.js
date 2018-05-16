import React from 'react'
import PropTypes from 'prop-types'
import { PlayerColours } from '../../chess/'
import { Piece } from './Piece'

export class Board extends React.Component {
    static propTypes = {
        playerColourPOV: PropTypes.string,
        board: PropTypes.object,
        onMakeMove: PropTypes.func,
        moveEnabled: PropTypes.bool,
        thisPlayerColour: PropTypes.string,
    }
    static defaultProps = {
        playerColourPOV: PlayerColours.White,
        board: null,
        onMakeMove: null,
        moveEnabled: true,
        thisPlayerColour: PlayerColours.White,
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
        this.handleSquareClick = this.handleSquareClick.bind(this)
        this.renderBoard = this.renderBoard.bind(this)
        this.renderPieces = this.renderPiecesWhiteView.bind(this)
    }

    handleSquareClick(column, row) {
        //console.log(column, row)
        if(!this.props.moveEnabled) {
            this.setState({
                selectedPiece: null
            })
            return
        }
        if (this.state.selectedPiece && this.props.onMakeMove) {
            this
                .props
                .onMakeMove(this.state.selectedPiece, column, row)
            this.setState({ selectedPiece: null })
        } else {
            const piece = this.props.board.pieceAt(column, row)
            if(piece) {
                this.setState({ selectedPiece: piece })
                console.log('selected'  + JSON.stringify(piece.position))
            }
        }
    }
    renderBoard() {
        
        const board = []
        const { boardWidth, boardHeight } = this.props.board
        const offset = this.props.thisPlayerColour == PlayerColours.White ? 0 : 1;
        const { selectedPiece } = this.state
        if(selectedPiece) {
            console.log('selected square is ' , selectedPiece.position)
        }
        for(let i = 0; i < boardHeight; i++) {
            const row = this.props.thisPlayerColour == PlayerColours.White ? boardHeight - i : i + 1
            for(let j = 0; j < boardWidth; j++) {
                
                const column = this.props.thisPlayerColour == PlayerColours.White ? j + 1 : boardWidth - j
                const selectedClassName = selectedPiece && selectedPiece.position.row == row && selectedPiece.position.column == column
                                            ? 'selected' 
                                            : ''
                const colour = ( i + j + offset) % 2 == 0 ? 'square white' : 'square black'
                board.push(
                    <rect
                        key={i*boardHeight+j}
                        width={this.squareSize}
                        height={this.squareSize}
                        className={colour + ' ' + selectedClassName}
                        x={j * this.squareSize}
                        y={i * this.squareSize}
                        onClick={this.handleSquareClick.bind(this, column, row)}
                    />
                )
            }
        }
        const hasSelectedPieceClassname = this.state.selectedPiece ? 'selected' : ''
        return <g key='chess-board-group' className={'chess-board-tiles' + ' ' + hasSelectedPieceClassname}>
                    {board}
                </g>
    }
    /**
     * Renders the board from white player's point of view,
     * We need to flip the board vertically.
     */
    renderPiecesWhiteView() {
        const piecesGraphics = []
        const whitePieces = this.props.board.whiteView.thisPlayerPieces
        const blackPieces = this.props.board.whiteView.otherPlayerPieces
        const { boardHeight, boardWidth } = this.props.board
        for(let i = 0; i < whitePieces.length; i++) {
            piecesGraphics.push(<Piece
                                    key={'white-' + i}
                                    piece={whitePieces[i]}
                                    size={this.squareSize}
                                    displayRow={boardHeight - whitePieces[i].position.row + 1}
                                    displayColumn={whitePieces[i].position.column}
                                    />)
        }

        for(let i = 0; i < blackPieces.length; i++) {
            piecesGraphics.push(<Piece
                                    key={'black-' + i}
                                    piece={blackPieces[i]}
                                    size={this.squareSize}
                                    displayRow={boardHeight - blackPieces[i].position.row + 1}
                                    displayColumn={blackPieces[i].position.column}
                                    />)
        }
        return <g key='pieces-group' className='pieces-group'>{piecesGraphics}</g>
    }
    /**
     * Renders the board from black player's point of view,
     * We need to flip the board horizontally.
     */
    renderPiecesBlackView() {
        const piecesGraphics = []
        const whitePieces = this.props.board.whiteView.thisPlayerPieces
        const blackPieces = this.props.board.whiteView.otherPlayerPieces
        const { boardHeight, boardWidth } = this.props.board
        for(let i = 0; i < whitePieces.length; i++) {
            piecesGraphics.push(<Piece
                                    key={'white-' + i}
                                    piece={whitePieces[i]}
                                    size={this.squareSize}
                                    displayRow={whitePieces[i].position.row}
                                    displayColumn={boardWidth - whitePieces[i].position.column + 1}
                                    />)
        }

        for(let i = 0; i < blackPieces.length; i++) {
            piecesGraphics.push(<Piece
                                    key={'black-' + i}
                                    piece={blackPieces[i]}
                                    size={this.squareSize}
                                    displayRow={blackPieces[i].position.row}
                                    displayColumn={boardWidth - blackPieces[i].position.column + 1}
                                    />)
        }
        return <g key='pieces-group' className='pieces-group'>{piecesGraphics}</g>
    }
    render() {
        if (!this.props.board) {
            return this.renderEmptyBoard()
        }
        
        const { boardWidth, boardHeight } = this.props.board
        const pieces = this.props.thisPlayerColour == PlayerColours.White
                            ? this.renderPiecesWhiteView()
                            : this.renderPiecesBlackView()
        return (
            <div className={this.props.playerColourPOV}>
                <svg
                    className='chess-board'
                    width={boardWidth * this.squareSize}
                    height={boardHeight * this.squareSize}>
                    {this.renderBoard()}
                    {pieces}
                </svg>
            </div>
        )
    }
}

export default Board

import React from 'react'
import PropTypes from 'prop-types'
import { PlayerColours } from '../../chess/'
import { Piece } from './Piece'

export class Board extends React.Component {
    static propTypes = {
        playerColourPOV: PropTypes.string,
        board: PropTypes.object,
        onMakeMove: PropTypes.func,
    }
    static defaultProps = {
        playerColourPOV: PlayerColours.White,
        board: null,
        onMakeMove: null,
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
        this.handlePieceClick = this.handlePieceClick.bind(this)
    }

    handlePieceClick(position) {
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

    render() {
        if (!this.props.board) {
            return this.renderEmptyBoard()
        }
        const board = []
        for (let i = this.props.board.boardHeight; i >= 1; i -= 1) {
            const row = []
            for (let j = 1; j <= this.props.board.boardWidth; j += 1) {
                const piece = this.props.board.pieceAt(j, i)
                const position = {
                    column: j,
                    row: i,
                }
                row.push(<Piece
                            key={j}
                            piece={piece}
                            onPieceClick={this.handlePieceClick}
                            selected={false}
                            position={position}
                            />)
            }
            board.push(<div key={i}>{ row }</div>)
        }
        return (
            <div className={this.props.playerColourPOV}>
                {board}
                {this.state.selectedPiece ? this.state.selectedPiece.kind : null}
            </div>
        )
    }
}

export default Board

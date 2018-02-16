import React from 'react'
import PropTypes from 'prop-types'
import { ChessBoard, Columns } from '../../chess/'
import { Piece } from './Piece'

export class Board extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            board: ChessBoard.initialBoard()
        }
    }

    render() {
        const board = []
        for(let i = this.state.board.boardHeight; i >= 1; i--) {
            let row = []
            for(let j = 1; j <= this.state.board.boardWidth; j++) {
                row.push(<Piece piece={ this.state.board.pieceAt(j, i) } />)
            }
            board.push(<div>{ row }</div>)
        }    
        return (
            <div>
                { board }
            </div>
        )
    }
}
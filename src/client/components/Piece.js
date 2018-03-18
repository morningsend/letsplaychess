import React from 'react'
import PropTypes from 'prop-types'
import { PieceKinds, PlayerColours } from '../../chess/'

import kingBlack from '../assets/svg/king_black.svg'
import pawnBlack from '../assets/svg/pawn_black.svg'
import queenBlack from '../assets/svg/queen_black.svg'
import bishopBlack from '../assets/svg/bishop_black.svg'
import rookBlack from '../assets/svg/rook_black.svg'
import knightBlack from '../assets/svg/knight_black.svg'

import kingWhite from '../assets/svg/king_white.svg'
import pawnWhite from '../assets/svg/pawn_white.svg'
import queenWhite from '../assets/svg/queen_white.svg'
import bishopWhite from '../assets/svg/bishop_white.svg'
import rookWhite from '../assets/svg/rook_white.svg'
import knightWhite from '../assets/svg/knight_white.svg'
import empty from '../assets/svg/empty.svg'

import atlas from '../assets/svg/pieces_atlas.svg'

const pieceImages = {
    kingBlack,
    pawnBlack,
    queenBlack,
    bishopBlack,
    rookBlack,
    knightBlack,
    kingWhite,
    pawnWhite,
    queenWhite,
    bishopWhite,
    rookWhite,
    knightWhite,
    empty,
}

function getPieceSVG(piece) {
    let imageName = 'empty'
    if (!piece) {
        return pieceImages[imageName]
    }

    switch (piece.kind) {
    case PieceKinds.Pawn:
        imageName = 'pawn'
        break
    case PieceKinds.Knight:
        imageName = 'knight'
        break
    case PieceKinds.Bishop:
        imageName = 'bishop'
        break
    case PieceKinds.Rook:
        imageName = 'rook'
        break
    case PieceKinds.King:
        imageName = 'king'
        break
    case PieceKinds.Queen:
        imageName = 'queen'
        break
    default:
        break
    }
    imageName += piece.colour === PlayerColours.White ? 'White' : 'Black'
    return pieceImages[imageName]
}

export class Piece extends React.PureComponent {
    static propTypes = {
        piece: PropTypes.object.isRequired,
        size: PropTypes.number,
        key: PropTypes.string,
        displayRow: PropTypes.number,
        displayColumn: PropTypes. number,
    }
    static defaultProps = {
        size: 0,
        piece: null,
        key: '',
        displayRow: 1,
        displayColumn: 1
    }
    constructor(props) {
        super(props)
    }
    render() {
        const {
            piece, size, selected, key, displayColumn, displayRow,
        } = this.props
        const {
            kind, colour, position
        } = piece
        const selectedClass = selected ? ' selected' : ''
        const transform = `translate(${size * (displayColumn - 1)} ${size * (displayRow - 1)})`
        return (
            <use
                key={key}
                transform={transform} 
                href={atlas + `#${colour}-${kind}`}
                className='chess-piece'
            />
        )
    }
}

Piece.propTypes = {
    piece: PropTypes.shape({
        colour: PropTypes.string,
        kind: PropTypes.string,
    }),
    position: PropTypes.shape({
        column: PropTypes.number,
        row: PropTypes.number,
    }),
    onPieceClick: PropTypes.func,
    selected: PropTypes.bool,
}
Piece.defaultProps = {
    piece: null,
    onPieceClick: () => {},
    selected: false,
    position: { column: 1, row: 1 },
}

export default Piece

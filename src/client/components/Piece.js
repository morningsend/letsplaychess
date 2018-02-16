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
import empty from '../assets/svg/pawn_white.svg'

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
    empty
}

function getPieceSVG(piece) {
    let imageName = 'empty'
    if(!piece) {
        return pieceImages[imageName]
    }

    switch(piece.kind) {
        case PieceKinds.Pawn:
        imageName= 'pawn'
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

export const Piece = (props) => {
    const piece = props.piece
    return piece
    ? <object className="piece" data={ getPieceSVG(props.piece) } /> 
    : <div className="piece piece-empty"></div>
        
}

Piece.propType = {
    piece: PropTypes.object
}
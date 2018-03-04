import { PieceKinds } from './ChessPieces'
import { MoveTypes } from '.';

export const ChessPieceNotation = {}

ChessPieceNotation[PieceKinds.King] = 'K'
ChessPieceNotation[PieceKinds.Queen] = 'Q'
ChessPieceNotation[PieceKinds.Pawn] = ''
ChessPieceNotation[PieceKinds.Knight] = 'N'
ChessPieceNotation[PieceKinds.Bishop] = 'B'
ChessPieceNotation[PieceKinds.Rook] = 'R'

export const ChessMoveNotation = {}
ChessMoveNotation[MoveTypes.Normal] = ''
ChessMoveNotation[MoveTypes.TakePiece] = 'x'
ChessMoveNotation[MoveTypes.CastleKingSide] = 'O-O'
ChessMoveNotation[MoveTypes.CastleQueenSide] = 'O-O-O'
ChessMoveNotation[MoveTypes.PawnPromotion] = '='
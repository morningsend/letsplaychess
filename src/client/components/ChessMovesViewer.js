import React from 'react'
import PropTypes from 'prop-types'

export class ChessMovesViewer extends React.Component {
    static propTypes = {
        moves: PropTypes.array,
        onSelect: PropTypes.func
    }

    static defaultProps = {
        moves: [],
        onSelect: () => {}
    }
    constructor(props) {
        super(props)
    }
    renderMoves(moves) {
        const numberOfRows =  Math.floor(moves.length / 2)
        const remainder = moves.length - numberOfRows * 2
        const rows = []
        for(let i = 0; i < numberOfRows; i++) {
            rows.push(
                <tr>
                    <td>{i}</td>
                    <td>{ moves[2*i].toString() }</td>
                    <td>{ moves[2*i + 1].toString() }</td>
                </tr>
            )
        }
        if(remainder !== 0) {
            rows.push(
                <tr>
                    <td>{numberOfRows}</td>
                    <td>{moves[2*numberOfRows].toString() }</td>
                    <td></td>
                </tr>
            )
        }
        return rows
    }
    render() {
        return(
            <div className='chess-moves-viewer-container'>
                <table>
                    <tbody>
                        { this.renderMoves(this.props.moves) }
                    </tbody>
                </table>
            </div>
        )
    }
}
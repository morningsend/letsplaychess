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
                <tr key={i}>
                    <td key={0}>{i + 1}</td>
                    <td key={1}>{ moves[2*i].toString() }</td>
                    <td key={2}>{ moves[2*i + 1].toString() }</td>
                </tr>
            )
        }
        if(remainder !== 0) {
            rows.push(
                <tr key={numberOfRows}>
                    <td key={0}v>{numberOfRows + 1}</td>
                    <td key={1}>{moves[2*numberOfRows].toString() }</td>
                    <td key={2}></td>
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
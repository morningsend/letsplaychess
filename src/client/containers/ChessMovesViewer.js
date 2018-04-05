import React from 'react'
import PropTypes from 'prop-types'

export class ChessMovesViewer extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <div className='chess-moves-viewer-container'>
                <h1>game moves</h1>
            </div>
        )
    }
}
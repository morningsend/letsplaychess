import React from 'react'
import PropTypes from 'prop-types'

export class MoveHistory extends React.PureComponent {
    static propTypes = {
        moves: PropTypes.array
    }

    static defaultProps = {
        moves: []
    }
    render() {
        return (
            <div className='move-history-container'>
                {
                    this.moves.map(move => {
                        <p>{ move.toString() }</p>
                    })
                }   
            </div>
        )
    }
}
export default MoveHistory
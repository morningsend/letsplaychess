import React from 'react'
import PropTypes from 'prop-types'

export class ChessClock extends React.Component {

    static propTypes = {
        durationInSeconds: PropTypes.number,
        countingDown: PropTypes.bool
    }
    static defaultProps = {
        durationInSeconds: 900,
        countingDown: false
    }
    constructor(props) {
        super(props)

        this.state = {
            secondsRemaining: this.props.durationInSeconds,    
        }
    }

    render() {
        const t = Math.floor(this.props.durationInSeconds || 0)
        const minutes = Math.floor(t / 60)
        const seconds = t % 60
        const activeClass = 'time ' + (this.props.countingDown ? 'active' : '')
        return (
            <div className='chess-clock-container'>
                <span className={activeClass}>{ (minutes < 10 ? '0' : '' )+minutes}<span className='ticker'>:</span>{(seconds < 10 ? '0' : '' )+seconds}</span>
            </div>
        )
    }
}

export default ChessClock

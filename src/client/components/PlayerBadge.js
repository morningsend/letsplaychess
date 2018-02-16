import React from 'react'
import PropTypes from 'prop-types'

export class PlayerBadge extends React.PureComponent {
    static propTypes = {
        player: PropTypes.shape({
            name: PropTypes.string,
            img: PropTypes.string,
            rating: PropTypes.number,
        }),
    }
    static defaultProps = {
        player: {
            name: 'no-name',
            img: '',
            rating: 1200,
        },
    }

    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        const { name, img, rating } = this.props.player
        return (
            <div>
                <p><span>{name}</span>{img} <span>({rating})</span></p>
            </div>
        )
    }
}

export default PlayerBadge

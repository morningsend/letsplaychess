import React from 'react'
import PropTypes from 'prop-types'

export const PlayerBadge = (props)=> {

        const { name, img, rating } = this.props.player
        return (
            <div>
                <p><span>{name}</span>{img} <span>({rating})</span></p>
            </div>
        )
    }
PlayerBadge.propTypes = {
    player: PropTypes.shape({
        name: PropTypes.string,
        img: PropTypes.string,
        rating: PropTypes.number,
    }),
}
PlayerBadge.defaultProps = {
    player: {
        name: 'no-name',
        img: '',
        rating: 1200,
    },
}

export default PlayerBadge

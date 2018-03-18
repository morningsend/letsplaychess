import React from 'react'
import PropTypes from 'prop-types'

import defaultProfileImg from '../assets/images/default_profile.png'

export const PlayerBadge = (props)=> {

        const { name, rating } = props.player
        const img = props.player.img || defaultProfileImg
        return (
            <div className='player-badge-container'>
                <div className='player-avatar-small'></div>
                <div>
                    <p className='player-name'>{name} ({rating})</p>
                </div>
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

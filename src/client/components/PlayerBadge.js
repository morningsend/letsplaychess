import React from 'react'
import PropTypes from 'prop-types'

export const PlayerBadge = (props)=> {
    const { name, rating } = props.player
    const img = props.player.img || ''
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

PlayerBadge.Placeholder = (props) => (
<div className='player-badge-container placeholder'>
    <div className='player-avatar-small'></div>
    <div>
        <p className='player-name'></p>
    </div>
</div>
)
export default PlayerBadge

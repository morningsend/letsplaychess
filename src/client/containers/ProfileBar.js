import React from 'react'
import { Link } from 'react-router-dom'

import ProfileImageUrl from '../assets/images/jon_snow.jpg'

export class ProfileBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div className='profile-bar'>

                <div>
                    <div className='profile-picture' style={{backgroundImage: `url(${ProfileImageUrl}`}} />
                    <h1 className='profile-name'> jonsnow101 </h1>
                    <div className='profile-score'> (1200) </div>
                    <div className='stats'>
                        <span className='stats-item win-stats'> 17 Won </span>
                        <span className='stats-item draw-stats'> 2 Draw </span>
                        <span className='stats-item loss-stats'> 7 Losses </span>
                    </div>
                    <div className='profile-menu'>
                        <div className='profile-menu-item past-games active'> Past Games </div>
                        <div className='profile-menu-item settings'> Settings </div>
                    </div>
                </div>
                <div className='guest-button-container'>
                    <Link to='/game' className='button button-primary'>
                        Play As Guest
                    </Link>
                </div>
            </div>
        )
    }
}

export default ProfileBar

import React from 'react'

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
                </div>
                <input placeholder='password' type='password' />
                <button className='button login-button'>
                    Quick Game
                </button>
            </div>
        )
    }
}

export default ProfileBar

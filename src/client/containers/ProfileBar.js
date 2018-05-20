import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import ProfileImageUrl from '../assets/images/jon_snow.jpg'

export class ProfileBar extends React.Component {

    static propTypes = {
        user: PropTypes.object,
        onSelectMenu: PropTypes.func,
        menuItems: PropTypes.array,
        selectedIndex: PropTypes.number,
    }

    static defaultTypes = {
        user: {},
        onSelectMenu: () => {},
        menuItems: ['Past Games', 'Settings'],
        selectedIndex: 0,
    }
    constructor(props) {
        super(props)
        this.state = {
            currentSelected: 0,
        }
        this.handleMenuClick = this.handleMenuClick.bind(this)
    }

    handleMenuClick(index) {
        this.props.onSelectMenu
            && this.props.onSelectMenu(index)
    }
    render() {
        const { user, menuItems } = this.props
        console.log(this.props)
        return (
            <div className='profile-bar'>
                <div>
                    <div className='profile-picture'/>
                    <h1 className='profile-name'> {user.username} </h1>
                    <div className='profile-score'> ({user.ranking}) </div>
                    <div className='stats'>
                        <span className='stats-item win-stats'>{user.summary.win} Won</span>
                        <span className='stats-item draw-stats'>{user.summary.draw} Draw</span>
                        <span className='stats-item loss-stats'>{user.summary.loss} Losses</span>
                    </div>
                    <div className='profile-menu'>
                        {
                            menuItems.map((item, index) => (
                                <div
                                    key={item}
                                    className={'profile-menu-item' + (this.props.selectedIndex == index ? ' active' : '')}
                                    onClick={this.handleMenuClick.bind(this,index)}
                                >
                                    {item}
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className='quick-game-button-container'>
                    <Link to='/game' className='button button-primary'>
                        Quick Game
                    </Link>
                </div>
            </div>
        )
    }
}

export default ProfileBar

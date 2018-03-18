import React from 'react'
import { Link } from 'react-router-dom'
import { ProfileBar } from '../containers'
import { Avatar, Page, Content, Header, HeaderItem, PopUpMenu, MenuItem } from '../components'

export class AccountPage extends React.Component {
    static propTypes = {}
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        return (
            <Page className='page game-page'>
                <Header>
                    <h1 className='title'>Let&apos;s Play Chess</h1>
                    <HeaderItem>
                        <PopUpMenu button={
                            <button>
                                <Avatar name='Jonsnow283ac' img='' />
                            </button>
                        }>
                            <MenuItem>
                                <p>Game History (Last 7 days)</p>
                            </MenuItem>
                            <MenuItem><Link to='/account'>Your Acount</Link></MenuItem>
                            <MenuItem><Link to='/account'>Achievements</Link></MenuItem>
                            <MenuItem><Link to='/account'>Settings</Link></MenuItem>

                        </PopUpMenu>
                    </HeaderItem>
                </Header>
                <ProfileBar />
                <Content className='game-page-content'>
                </Content>
            </Page>
        )
    }
}

export default AccountPage

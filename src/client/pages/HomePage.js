import React from 'react'
import { Link } from 'react-router-dom'
import { LoginForm } from '../containers'
import { Page, Header, Content } from '../components'

export class HomePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        return (
            <Page className='page home-page'>
                <Header>
                    <h1>Let&#39;s Play Chess</h1>
                    <p>
                        <Link to='/game'>start a quick game</Link>
                        <Link to='/login'>Login To Your account</Link>
                    </p>
                </Header>
                <Content>
                    <LoginForm />
                </Content>
            </Page>
        )
    }
}

export default HomePage

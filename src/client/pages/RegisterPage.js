import React from 'react'
import { Link } from 'react-router-dom'
import { LoginForm } from '../containers'
import { Page, Header, Content } from '../components'

export class RegisterPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        return (
            <Page className='page home-page'>
                <Content>
                  <div className='sidebar'>
                    <h1 className='page-title'>
                      Let&apos;s Play Chess
                    </h1>
                  <div>
                    <LoginForm />
                    <Link to='/register' className='register-here-link'>
                      Don&apos;t have an account? Register here.
                    </Link>
                  </div>
                  <div className='guest-button-container'>
                      <button className='button button-primary'>
                        Play As Guest
                      </button>
                    </div>
                  </div>
                </Content>
            </Page>
        )
    }
}

export default RegisterPage

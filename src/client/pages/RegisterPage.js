import React from 'react'
import { Link } from 'react-router-dom'
import { RegisterForm } from '../containers'
import { Page, Header, Content } from '../components'

export class RegisterPage extends React.Component {
    constructor(props) {
        super(props)
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
                      <RegisterForm />
                      </div>
                  <div className='back-to-login-container'>
                      <Link to='/' className='back-to-login'>
                        Back to login &#62;
                      </Link>
                      </div>
                  </div>
                </Content>
            </Page>
        )
    }
}

export default RegisterPage

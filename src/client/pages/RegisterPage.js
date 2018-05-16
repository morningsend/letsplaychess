import React from 'react'
import { RegisterApi } from '../api'
import { Link } from 'react-router-dom'
import { RegisterForm } from '../containers'
import { Page, Header, Content } from '../components'

export class RegisterPage extends React.Component {
    constructor(props) {
        super(props)
        this.onRegister = this.onRegister.bind(this)
        this.state = {
            formEnabled: true,
            message: '',
            errorMessage: '',
            success: false,
            error: false,
        }
    }
    onRegister(username, email, password) {
        this.setState({
            formEnabled: false
        })
        RegisterApi.register(username, email, password)
            .then(result => {
                this.setState({
                    formEnabled: false,
                    message: 'You have successfully registered on',
                    success: true,
                })
            })
            .catch(error => {
                this.setState({
                    success: false,
                    error: true,
                    errorMessage: error.message,
                    formEnabled: true,
                })
            }) 
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
                            <RegisterForm onRegister={this.onRegister} enabled={this.state.formEnabled}/>
                        </div>
                        {
                            this.state.success
                            ? <p>You have successfully registered. You can login now.</p>
                            : null
                        }
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

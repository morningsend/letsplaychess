import React from 'react'

export class RegisterForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <form className='register-form'>
                <input placeholder='Username' />
                <input placeholder='Email' />
                <input placeholder='password' type='password' />
                <button className='button register-button'>
                    Register
                </button>
            </form>
        )
    }
}

export default RegisterForm

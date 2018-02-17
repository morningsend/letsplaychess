import React from 'react'
import { Link } from 'react-router-dom'
import { LoginForm } from '../containers'

export class HomePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        return (
            <div className='page home-page'>
                <p><Link to='/game'>start a quick game</Link></p>

                <p><Link to='/login'>Login To Your account</Link></p>

                <LoginForm />
            </div>
        )
    }
}

export default HomePage

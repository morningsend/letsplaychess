import React from 'react'
import { Link } from 'react-router-dom'

export class HomePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        return (
            <div>
                <h1>home page</h1>
                <p><Link to='/game'>start a quick game</Link></p>

                <p><Link to='/login'>Login To Your account</Link></p>
            </div>
        )
    }
}

export default HomePage

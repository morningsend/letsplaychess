import React from 'react'
import { Link } from 'react-router-dom'
import { Page } from '../components'

export class AccountPage extends React.Component {
    static propTypes = {}
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        return (
            <Page>
                <h1>Account Page</h1>
                <Link to='/game'>Quick Game</Link>
                <p>
                    Account page allows user to manage his acount, change password,
                    ...etc.
                </p>
            </Page>
        )
    }
}

export default AccountPage

import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { HomePage, GamePage, AccountPage, LoginPage } from './pages'

export const Routes = () => (
    <main>
        <Switch>
            <Route exact path='/' component={HomePage} />
            <Route path='/game' component={GamePage} />
            <Route path='/account' component={AccountPage} />
            <Route path='/login' component={LoginPage} />
        </Switch>
    </main>
)

export default Routes

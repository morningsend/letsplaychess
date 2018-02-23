import { App } from './App'
import { HomePage, GamePage, AccountPage, RegisterPage } from './pages'

export const Routes = [
    {
        component: App,
        routes: [
            {
                path: '/',
                exact: true,
                component: HomePage,
            },
            {
                path: '/game',
                component: GamePage,
            },
            {
                path: '/account',
                component: AccountPage,
            },
            {
                path: '/register',
                component: RegisterPage,
            }
        ],
    },
]

export default Routes

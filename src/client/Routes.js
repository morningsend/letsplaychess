import { App } from './App'
import { HomePage, GamePage, AccountPage, RegisterPage, NotFoundPage, ReplayPage, UserPage, LogoutPage } from './pages'

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
                path: 'user/:userId',
                component: UserPage,
            },
            {
                path: '/register',
                component: RegisterPage,
            },
            {
                path: '/replay/:matchId',
                component: ReplayPage,
            },
            {
                path: '/logout',
                component: LogoutPage,
            }
        ],
    },
]

export default Routes

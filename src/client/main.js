import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import { Routes } from './Routes'
import store from './store'
import './assets/style/site.scss'

const render = (routes) => {
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <BrowserRouter>
                    {renderRoutes(routes)}
                </BrowserRouter>
            </Provider>
        </AppContainer>,
        document.getElementById('root'),
    )
}

render(Routes)

if (module.hot) {
    module.hot.accept('./Routes', () => {
        const NewApp = require('./Routes').default
        render(NewApp)
    })
}

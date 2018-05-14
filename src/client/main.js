import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import { AppContainer } from 'react-hot-loader'
import { Routes } from './Routes'
import './assets/style/site.scss'

const render = (routes) => {
    ReactDOM.render(
        <AppContainer>
            <BrowserRouter>
                {renderRoutes(routes)}
            </BrowserRouter>
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

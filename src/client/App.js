import React from 'react'
import { PropTypes } from 'prop-types'
import { renderRoutes } from 'react-router-config'

export const App = (props) => {
    return (
        <main className='app'>
            {renderRoutes(props.route.routes)}
        </main>
    )
}

App.propTypes = {
    route: PropTypes.object.isRequired,
}

export default App

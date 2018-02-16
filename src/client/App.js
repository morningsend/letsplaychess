import React from 'react'
import './assets/style/site.scss'
import { Routes } from './Routes'

export class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {}
    }
    render() {
        return (
            <Routes />
        )
    }
}

export default App

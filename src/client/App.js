import React from 'react'
import './assets/style/site.scss'

export class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            name: 'World. GOODBYE ALL MY PROBLEMS',
        }
    }
    render() {
        return (
            <div>
                <h1>hello { this.state.name }</h1>
                <h2>todoapp</h2>
            </div>
        )
    }
}

export default App

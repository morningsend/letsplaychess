import React, { Component } from 'react'
import PropType from 'prop-types'

export class ReplayPage extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount () {
        console.log(this.props.match)
    }
    
    render() {
        return (
            <div>
                Replay page
            </div>
        )
    }
}

export default ReplayPage
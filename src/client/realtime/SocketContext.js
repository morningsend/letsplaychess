import React, { Component } from 'react'
import PropTypes from 'prop-types'
import io from 'socket.io-client'
import { config } from '../config'

const SocketContext  = React.createContext('socket')
export const SocketContextConsumer = SocketContext.Consumer
export class SocketContextProvider extends Component {
    static propTypes = {
        children: PropTypes.element
    }

    static defaultProps = {
        children: null
    }
    setUserId(userId) {
        this.setState({
            userId
        })
    }
    setGameId(gameId) {
        this.setState({
            gameId
        })
    }
    constructor(props) {
        super(props)
        this.state = {
            userId: '',
            gameId: '',
        }
        this.socket = null
    }
    connect() {
        if(!this.socket) {
            try {
                const options = {
                    transports: ['websocket'],
                    reconnectionAttempts: 'Infinity',
                }
                this.socket = io.connect(config.socketUrl, options)
                this.setupSocket(this.socket)
            } catch(error) {
                console.error(error)
            }
        }
    }
    disconnect() {
        if(this.socket) {
            this.socket.disconnect()
        }
    }
    render() {
        return (
            <SocketContext.Provider value={this.state}>
                {this.props.children}
            </SocketContext.Provider>
        )
    }
}
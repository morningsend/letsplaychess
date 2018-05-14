import React, { Component } from 'react'
import PropTypes from 'prop-types'
import io from 'socket.io-client'
import { config } from '../config'
import { ChatClient } from '.';

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
            isConnected: false,
            chatClient: null
        }
        this.socket = null
        this.setupSocket = this.setupSocket.bind(this)
        this.setupSocket()
    }
    connect() {
        console.log("socket context: connecting to socket server")
        if(this.socket && !this.state.isConnected) {
            this.socket.open()
        }
    }
    setupSocket() {
        const self = this
        try {
            const options = {
                transports: ['websocket'],
                reconnectionAttempts: 'Infinity',
                autoConnect: false
            }
            this.socket = io.connect(config.socketUrl, options)
            this.socket.on('connect', () => {
                self.setState({
                    'isConnected': true
                })
                this.chatClient = new ChatClient()
            })
            this.socket.on('disconnect', () => {
                self.setState({
                    'isConnected': false
                })
            })
        } catch(error) {
            console.error(error)
        }
    }
    disconnect() {
        if(this.socket) {
            this.socket.disconnect()
        }
    }
    componentDidMount() {
        this.connect()
    }
    componentWillUnmount() {
        this.disconnect()
    }
    render() {
        return (
            <SocketContext.Provider value={this.state}>
                {this.props.children}
            </SocketContext.Provider>
        )
    }
}
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import io from 'socket.io-client'
import { config } from '../config'
import { ChatClient, GameClient } from '.';

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
        this.socket = null
        this.setupSocket = this.setupSocket.bind(this)
        this.setupSocket()
        this.state = {
            userId: '',
            gameId: '',
            isConnected: false,
            chatClient: new ChatClient(io(config.baseUrl + config.chatSocket.namespace, { transports: ['websocket'],path: config.path })),
            gameClient: new GameClient(io(config.baseUrl + config.gameSocket.namespace, { transports: ['websocket'],path: config.path })),
        }
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
                autoConnect: false,
                path: config.path,
            }
            this.socket = io.connect(config.baseUrl, options)
            this.socket.on('connect', () => {
                self.setState({
                    'isConnected': true
                })
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
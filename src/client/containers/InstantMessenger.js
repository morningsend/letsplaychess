import React from 'react'
import PropTypes from 'prop-types'
import { MessageList} from '../components'
import { PostMessageForm } from '../components'
import { ChatClient, SocketContextConsumer } from '../realtime';

const mockMessages = [
    {
        id: 1,
        timestamp: new Date().getTime(),
        text: 'Hello, where are you from?',
        owner: 'daenerys',
        self: false
    },
    {
        id: 2,
        timestamp: new Date().getTime(),
        text: 'I am from a country far far far away.',
        owner: 'jonsnow',
        self: true
    }
]
export class InstantMessenger extends React.Component {
    static propTypes = {
        gameId: PropTypes.string,
        chatClient: PropTypes.object,
        isConnected: PropTypes.bool,
    }
    static defaultProps = {
        gameId: -1,
        chatClient: null,
        isConnected: false,
    }
    constructor(props) {
        super(props)
        console.log(props)
        this.state = {
            messages: []
        }
        this.sendMessage = this.sendMessage.bind(this)
        this.handleNewMessage = this.handleNewMessage.bind(this)
    }

    componentDidMount() {
        if(this.props.chatClient) 
            this.props.chatClient.onNewMessage(this.handleNewMessage)
    }
    handleNewMessage(message) {
        console.log(message)
        this.setState({
            messages: [...mockMessages, message]
        })
    }
    componentWillUnmount() {
        if(this.props.chatClient) {

        }
    }
    sendMessage(userName, text) {
        console.log(userName , text)
        let now = new Date();
        let hhmmss = now.getTime();

        const newMessage = {
            id: this.state.messages.length + 1,
            timestamp: hhmmss,
            text: text,
            owner: userName,
            self: true
        }

        this.setState({
            messages: [...this.state.messages,newMessage],
            text: '',
        })
        this.sendMessageToServer(newMessage)
    }
    sendMessageToServer(message) {
        if(this.props.chatClient)
            this.props.chatClient.send(message)
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        this.animateScrollToBottom(500)
    }
    animateScrollToBottom(durationMilliseconds) {
        const duration = Math.max(durationMilliseconds, 100)
        const current = this.messageSpaceNode.scrollTop
        const target = this.messageSpaceNode.scrollHeight
        const diff = target - current
        const amountPerFrame = diff *1000 / duration / 60
        var frame = 0
        var frameEnd = 60 * duration / 1000
        const step = () => {
            if(frame > frameEnd) {
                return
            }
            frame++
            this.messageSpaceNode.scrollTop = amountPerFrame * frame
            requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
    }
    render() {
        return (
            <div className='messenger-container'>
                {
                    this.props.isConnected ? null : <div className='messenger-error'>Disconnected from server, reconnecting...</div>
                }
                <div className='message-space' ref={node => this.messageSpaceNode = node}>
                    <MessageList messages={this.state.messages} />
                </div>
                <PostMessageForm sendMessage={this.sendMessage} enabled={this.props.isConnected}/>
            </div>
        )
    }
}

export const SocketInstantMessenger = props => {
    return <SocketContextConsumer>
        {
            socketState => <InstantMessenger {...props} {...socketState}/>
        }
    </SocketContextConsumer>
}
export default SocketInstantMessenger
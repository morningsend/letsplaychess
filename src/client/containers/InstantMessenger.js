import React from 'react'
import PropTypes from 'prop-types'
import { MessageList} from '../components'
import { PostMessageForm } from '../components'
import { ChatClient } from '../realtime/ChatClient';

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
        gameId: PropTypes.number,
    }
    static defaultProps = {
        gameId: -1
    }
    constructor(props, context) {
        super(props, context)
        this.state = {
            messages: mockMessages,
            chatClient: null,
        }
        this.sendMessage = this.sendMessage.bind(this)
        this.handleNewMessage = this.handleNewMessage.bind(this)
    }

    componentDidMount() {
        const client  = new ChatClient("30423", "uaieura", "102312")
        client.onNewMessage(this.handleNewMessage)
        this.setState({
            chatClient: client
        })
        //client.connect()
    }
    handleNewMessage(data) {
        console.log(data)
    }
    shouldComponentUpdate(nextProps, nextState) {
        if(this.props.gameId === nextProps.gameId) {
            return false
        }
        return true
    }
    sendMessage(owner, text) {
        console.log(owner , text)
        let now = new Date();
        let hhmmss = now.getTime();

        const newMessage = {
            id: this.state.messages.length + 1,
            timestamp: hhmmss,
            text: text,
            owner: owner,
            self: true
        }

        this.setState({
            messages: [...this.state.messages,newMessage],
            text: '',
        })
        this.sendMessageToServer(text)
    }
    sendMessageToServer(message) {
        if(this.state.chatClient)
            this.state.chatClient.send(message)
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
                <div className='message-space' ref={node => this.messageSpaceNode = node}>
                    <MessageList messages={this.state.messages} />
                </div>
                <PostMessageForm sendMessage={this.sendMessage}/>
            </div>
        )
    }
}

export default InstantMessenger

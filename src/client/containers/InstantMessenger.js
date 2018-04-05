import React from 'react'
import { MessageList} from '../components'
import { PostMessageForm } from '../components'
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
    constructor(props, context) {
        super(props, context)
        this.state = {
            messages: mockMessages,
        }

        this.sendMessage = this.sendMessage.bind(this)
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

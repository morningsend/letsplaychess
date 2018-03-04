import React from 'react'
import { Message } from '../components'
import { PostMessageForm } from '../components'

export class InstantMessenger extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            messages: [],
            text: '',
        }

        this.sendMessage = this.sendMessage.bind(this)
    }

    sendMessage(e) {
        e.preventDefault()
        if (this.state.text) {
          let now = new Date();
          let hhmmss = now.getTime();

          const newMessage = { id: this.state.messages.length + 1,
                               timestamp: hhmmss,
                               text: this.state.text,
                               owner: 'Chuck',}

            this.setState({
                messages: [...this.state.messages, newMessage],
                text: '',
            })
        }
    }

    render() {
        return (
            <div>
                <ul>
                    {
                        this.state.messages.map(message =>
                        <Message text={message.text}
                                 owner={message.owner}
                                 timestamp={message.timestamp}
                                 key={message.id} />)
                    }
                </ul>
                <div>
                <PostMessageForm />
                </div>
            </div>
        )
    }
}

export default InstantMessenger

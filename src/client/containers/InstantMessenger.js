import React from 'react'
import { MessageList} from '../components'
import { PostMessageForm } from '../components'

export class InstantMessenger extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.state = {
            messages: [],
            /*text: '',*/
        }

        this.sendMessage = this.sendMessage.bind(this)
    }


    sendMessage(owner, text) {
      console.log(owner , text)
      let now = new Date();
      let hhmmss = now.getTime();

      const newMessage = { id: this.state.messages.length + 1,
                           timestamp: hhmmss,
                           text: text,
                           owner: owner,}

        this.setState({
            messages: [...this.state.messages,newMessage],
            text: '',
        })
    }


    render() {
        return (
            <div className='messenger-container'>
                <div className='message-space'>
                    <MessageList messages={this.state.messages} />
                </div>
                <PostMessageForm sendMessage={this.sendMessage}/>
            </div>
        )
    }
}

export default InstantMessenger

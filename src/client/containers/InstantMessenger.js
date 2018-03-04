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
            <div>
              <MessageList messages={this.state.messages} />
              <PostMessageForm sendMessage={this.sendMessage}/>
                {/*<form onSubmit={this.sendMessage}>
                      <input value={this.state.text} onChange={this.handleSubmit} />
                      <button disabled={!this.state.text} onClick={this.sendMessage}>send</button>
                   </form>*/}
            </div>
        )
    }
}

export default InstantMessenger

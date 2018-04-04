import React from 'react'
import PropTypes from 'prop-types'
import { MessageList} from '../components'
import { PostMessageForm } from '../components'
import { ChatClient } from '../realtime/ChatClient';

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
            messages: [],
            /*text: '',*/
            chatClient: null,
        }
        this.sendMessage = this.sendMessage.bind(this)
    }

    componentDidMount() {
        const client  = new ChatClient("30423", "uaieura", "102312")
        this.setState({
            chatClient: client
        })
        client.connect()
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
              <MessageList messages={this.state.messages} />
              <PostMessageForm sendMessage={this.sendMessage}/>
            </div>
        )
    }
}

export default InstantMessenger

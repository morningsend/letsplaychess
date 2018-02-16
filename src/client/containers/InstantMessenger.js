import React from 'react'

export class InstantMessenger extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            messages: [],
            text: '',
        }

        this.sendMessage = this.sendMessage.bind(this)
        this.handleTyping = this.handleTyping.bind(this)
    }

    sendMessage(e) {
        e.preventDefault()
        if (this.state.text) {
            this.setState({
                messages: [...this.state.messages, this.state.text],
                text: '',
            })
        }
    }
    handleTyping(e) {
        this.setState({
            text: e.target.value,
        })
    }
    render() {
        return (
            <div>
                <ul>
                    {
                        this.state.messages.map(m => <li>{m}</li>)
                    }
                </ul>
                <div>
                    <form onSubmit={this.sendMessage}>
                        <input value={this.state.text} onChange={this.handleTyping} />
                        <button disabled={!this.state.text} onClick={this.sendMessage}>send</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default InstantMessenger

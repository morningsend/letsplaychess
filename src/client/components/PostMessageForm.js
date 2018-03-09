import React from 'react';

export class PostMessageForm extends React.Component {
    constructor( props, context ) {
        super( props, context );
        this.state = {
          name:'',
          text:'',
        }
        this.handleSubmit = this.handleSubmit.bind( this );
        this.handleTypingName = this.handleTypingName.bind( this );
        this.handleTypingText = this.handleTypingText.bind( this );
    }
    handleSubmit( event ) {
        event.preventDefault()
        if(typeof(this.props.sendMessage === 'function')){
          this.props.sendMessage( this.state.name, this.state.text )
          this.setState({
            name:'',
            text:'',
          })
        }
    }

    handleTypingName(e){
      console.log(e.target.value)
      this.setState({name: e.target.value})
    }
    handleTypingText(e){
      this.setState({text: e.target.value})
    }

    render() {
        const canSubmit = this.state.text
        return (
            <form onSubmit={this.handleSubmit} className='post-message-form'>
                <input
                    className="text-input"
                    type="text"
                    value={this.state.text}
                    onChange={this.handleTypingText}
                    placeholder="Message"
                    />
                <button disabled={!canSubmit} type="submit" value="Send" className="submit-button">Send</button>
            </form>
        );
    }
}

export default PostMessageForm;

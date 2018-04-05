import React from 'react';
import PropTypes from 'prop-types'

export class Message extends React.PureComponent {
    static PropTypes = {
        owner: PropTypes.string,
        text: PropTypes.string,
        time: PropTypes.Date
    }
    render() {
        let now = new Date( this.props.timestamp );
        let hhmmss = now.toISOString().substr(11, 8);
        const selfClassname = this.props.self ? ' self': ''
        return (
            <div className={"message" + selfClassname}>
                <strong className="message-owner">{this.props.owner}</strong>
                <p className='speech-bubble'>
                    {this.props.text}
                </p>
                <span className="message-time">{hhmmss}</span>
            </div>
        );
    }
}

export default Message;

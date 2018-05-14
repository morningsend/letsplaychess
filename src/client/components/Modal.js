import React from 'react'
import PropTypes from 'prop-types'

export class Modal extends React.PureComponent {

    static propTypes = {
        children: PropTypes.any,
        className: PropTypes.string,
    }

    static defaultProps = {
        children: null,
        className: '',
    }

    constructor(props) {
        super(props)
    }
    render() {
        const { children, className } = this.props
        return (
            <div className={'modal-container' + className}>
                {children}
            </div>
        )
    }
}

export default Modal

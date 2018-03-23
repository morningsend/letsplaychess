import React from 'react'
import PropTypes from 'prop-types'

export class Overlay extends React.PureComponent{

    static propTypes = {
        backgroundOpacity: PropTypes.number,
        children: PropTypes.element,
        className: PropTypes.string,
    }

    static defaultProps = {
        backgroundOpacity: 0.3,
        children: null,
        className: ''
    }
    constructor(props) {
        super(props)
    }

    render() {
        const { children, backgroundOpacity, className } = this.props
        const style = {
            backgroundColor: 'rgba(0,0,0,' + backgroundOpacity + ')',
        }
        return (
            <div className={'overlay-container ' + className} style={style}>
                {this.props.children}
            </div>
        )
    }
}
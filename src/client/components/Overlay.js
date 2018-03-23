import React from 'react'
import PropTypes from 'prop-types'

export class Overlay extends React.PureComponent{

    static propTypes = {
        backgroundOpacity: PropTypes.number,
        children: PropTypes.element,
        className: PropTypes.string,
        visible: PropTypes.bool,
    }

    static defaultProps = {
        backgroundOpacity: 0.4,
        children: null,
        className: '',
        visible: false,
    }
    constructor(props) {
        super(props)
    }

    render() {
        const { children, backgroundOpacity, className, visible } = this.props
        const style = {
            backgroundColor: 'rgba(0,0,0,' + backgroundOpacity + ')',
            display: visible ? 'absolute' : 'none',
        }
        return (
            <div className={'overlay-container ' + className} style={style}>
                {this.props.children}
            </div>
        )
    }
}

export default Overlay
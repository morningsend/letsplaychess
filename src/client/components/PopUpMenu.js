import React from 'react'
import PropTypes from 'prop-types'

export const MenuItem = ({
    children,
    onClick,
    ...rest
}) => (
    <button className='menu-item' onClick={onClick} {...rest}>{children}</button>
)

MenuItem.propTypes = {
    children: PropTypes.element,
    onClick: PropTypes.func,
}

MenuItem.defaultProps = {
    children: null,
    onClick: null,
}
export class PopUpMenu extends React.Component {
    static propTypes = {
        children: PropTypes.arrayOf(PropTypes.element),
    }
    static defaultProps = {
        children: [],
    }

    constructor(props) {
        super(props)
        this.state = {
            visible: false,
        }
        this.handleMenuToggle = this.handleMenuToggle.bind(this)
    }
    handleMenuToggle(e) {
        this.setState({
            visible: !this.state.visible,
        })
    }

    renderMenu() {
        return (
            <div className='menu-items'>{this.props.children}</div>
        )
    }

    render() {
        const menu = this.state.visible ? this.renderMenu() : null
        return (
            <div className='menu-container'>
                <button className='menu-toggle' onClick={this.handleMenuToggle}>Click</button>
                {menu}
            </div>
        )
    }
}

export default PopUpMenu

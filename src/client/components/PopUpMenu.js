import React from 'react'
import PropTypes from 'prop-types'

export const MenuItem = ({
    children,
    onClick,
    ...rest
}) => (
    <li className='menu-item' onClick={onClick} {...rest}>{children}</li>
)

MenuItem.propTypes = {
    children: PropTypes.element,
    onClick: PropTypes.func,
    offsetX: PropTypes.number,
    offsetY: PropTypes.number,
}

MenuItem.defaultProps = {
    children: null,
    onClick: null,
    offsetX: 0,
    offsetY: 0,
}
export class PopUpMenu extends React.Component {
    static propTypes = {
        children: PropTypes.arrayOf(PropTypes.element),
        button: PropTypes.element,
    }
    static defaultProps = {
        children: [],
        button: null,
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
            <ul className='menu-items'>{this.props.children}</ul>
        )
    }

    render() {
        const menu = this.state.visible ? this.renderMenu() : null
        const menuToggle = React.cloneElement(
            this.props.button,
            { onClick: this.handleMenuToggle, className: 'menu-toggle' }
        ) || <button className='menu-toggle' onClick={this.handleMenuToggle}>Click</button>
        return (
            <div className='menu-container'>
                {menuToggle}
                <div className='menu'>{menu}</div>
            </div>
        )
    }
}

export default PopUpMenu

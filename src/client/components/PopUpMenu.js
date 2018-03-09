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
}

MenuItem.defaultProps = {
    children: null,
    onClick: null,
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
        this.detectClickOutside = this.detectClickOutside.bind(this)
    }
    detectClickOutside(event) {
        if(!this.menuNode || !this.state.visible) {
            return
        }
        console.log(event)
        console.log(this.menuNode)
        const isContained = this.menuNode && (
            this.menuNode == event.srcElement ||
            this.menuNode.contains(event.srcElement)
        )
        console.log(isContained)
        if(this.state.visible && !isContained) {
            console.log('clicked outside')
        }
    }
    handleMenuToggle(e) {
        this.setState({
            visible: !this.state.visible,
        })
    }
    componentDidMount() {
        window.document.addEventListener('click', this.detectClickOutside)
    }

    componentWillUnmount() {
        window.document.removeEventListener('click', this.detectClickOutside)
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
                <div className='menu' ref={node => this.menuNode = node }>{menu}</div>
            </div>
        )
    }
}

export default PopUpMenu

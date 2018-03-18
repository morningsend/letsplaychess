import React from 'react'
import PropTypes from 'prop-types'


export const HeaderItem = (props) => (
    <div className='header-item'>
        {props.children}
    </div>
)
export const Header = ({
    className, style, children, ...rest
}) => (
    <nav className={`page-header ${className || ''}`} style={style} {...rest}>
        {children}
    </nav>
)

Header.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.array
    ]),
    style: PropTypes.object,
    className: PropTypes.string,
}

Header.defaultProps = {
    children: null,
    style: {},
    className: '',
}

export default Header

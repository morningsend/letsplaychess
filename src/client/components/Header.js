import React from 'react'
import PropTypes from 'prop-types'

export const Header = ({
    className, style, children, ...rest
}) => (
    <nav className={`page-header ${className || ''}`} style={style} {...rest}>
        {children}
    </nav>
)

Header.propTypes = {
    children: PropTypes.element,
    style: PropTypes.object,
    className: PropTypes.string,
}

Header.defaultProps = {
    children: null,
    style: {},
    className: '',
}

export default Header

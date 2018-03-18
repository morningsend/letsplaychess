import React from 'react'
import PropTypes from 'prop-types'

export const Content = ({
    className, children, ...rest
}) => (
    <div className={`page-content ${className || ''}`} {...rest}>
        {children}
    </div>
)

Content.propTypes = {
    className: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.array
    ]),
}

Content.defaultProps = {
    className: '',
    children: null,
}

export default Content

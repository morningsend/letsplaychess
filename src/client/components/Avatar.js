import React from 'react'
import PropTypes from 'prop-types'

export const Avatar = (props) => {
    const { img, name, onClick, className, ...rest, } = props
    const avatarImgStyle = img ? { backgroundImage: `url(${img})`} : null
    const divClassName = `avatar ${className || ''}`
    return (
        <span className={divClassName} {...rest}>
            <span className='avatar-image' style={avatarImgStyle}></span>
            <span>{name}</span>
        </span>
    )
}

Avatar.propsTypes = {
    img: PropTypes.string,
    name: PropTypes.string,
    onClick: PropTypes.func,
}

Avatar.defaultProps = {
    img: '',
    name: '',
    onClick: null,
}

export default Avatar
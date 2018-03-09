import React from 'react'
import PropTypes from 'prop-types'

export const Avatar = (props) => {
    const { img, name, onClick, className, ...rest, } = props
    const avatarImgStyle = img ? { backgroundImage: `url(${img})`} : null
    const divClassName = `avatar ${className || ''}`
    return (
        <div className={divClassName} {...rest}>
            <div className='avatar-image' style={avatarImgStyle}></div>
            <span>{name}</span>
        </div>
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
import React from 'react'
import PropTypes from 'prop-types'

export const Avatar = (props) => {
    const { img, name, ranking, className, ...rest, } = props
    const avatarImgStyle = img ? { backgroundImage: `url(${img})`} : null
    const divClassName = `avatar ${className || ''}`
    return (
        <span className={divClassName} {...rest}>
            <span className='avatar-image' style={avatarImgStyle}></span>
            <span>{name}({ranking || ''})</span>
        </span>
    )
}

Avatar.propsTypes = {
    img: PropTypes.string,
    name: PropTypes.string,
    ranking: PropTypes.number,
}

Avatar.defaultProps = {
    img: '',
    name: '',
}

export default Avatar
import React from 'react'
import PropTypes from 'prop-types'

import atlas from '../assets/svg/pieces_atlas.svg'

export class LoadingIcon extends React.PureComponent {

    static propTypes = {
        size: PropTypes.number,
        piece: PropTypes.oneOf(['Pawn', 'Rook'])
    }

    static defaultProps = {
        size: 64,
        piece: 'Rook'
    }
    constructor(props) {
        super(props)
    }
    render() {
        const { size, piece } = this.props
        const rectSize = size / 2
        return (
            <svg width={size} height={size} className='loading-icon'>
                <g>
                    <rect x={0} y={0} width={rectSize} height={rectSize} className='black' />
                    <rect x={0} y={rectSize} width={rectSize} height={rectSize} className='white' />
                    <rect x={rectSize} y={0} width={rectSize} height={rectSize} className='white' />
                    <rect x={rectSize} y={rectSize} width={rectSize} height={rectSize} className='black' />
                </g>
                <g className='loading-icon-piece'>
                    <use
                        className='loading-icon-piece-inner'
                        href={atlas + `#White-${piece}`}
                        xlinkHref={atlas + `#White-${piece}`}
                    />
                </g>
            </svg>
        )
    }

}

export default LoadingIcon
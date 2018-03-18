import React from 'react'
import PropTypes from 'prop-types'

export class Page extends React.PureComponent {
    static propTypes = {
        children: PropTypes.oneOfType([
            PropTypes.element,
            PropTypes.array
        ]),
        className: PropTypes.string,
    }

    static defaultProps = {
        children: null,
        className: '',
    }
    render() {
        return (
            <main className={this.props.className}>
                {this.props.children}
            </main>
        )
    }
}


export default Page

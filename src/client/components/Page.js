import React from 'react'
import PropTypes from 'prop-types'

export class Page extends React.PureComponent {
    static propTypes = {
        children: PropTypes.arrayOf(PropTypes.element).isRequired,
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

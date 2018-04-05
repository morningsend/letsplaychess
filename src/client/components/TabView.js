import React from 'react'
import PropTypes from 'prop-types'

class TabBar extends React.PureComponent {
    render () {
        return (
            <div className='tab-bar'>
                {this.props.children}
            </div>
        )
    }
}

class TabItem extends React.PureComponent{
    static propTypes = {
        index: PropTypes.number,
        children: PropTypes.element,
        onClick: PropTypes.func
    }
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick() {
        if(this.props.onClick) {
            this.props.onClick(this.props.index)
        }
    }
    render() {
        return (
            <button onClick={this.handleClick}>
                {this.props.children || 'helloworld'}
            </button>
        )
    }
}
const Tabs = (props) => {
    console.log(props)
    return props.tabs[props.active]
}

export const Tab = (props) => (this.props.children)
export class TabView extends React.Component {
    static propTypes = {
        barItems: PropTypes.arrayOf(PropTypes.element),
    }
    constructor(props) {
        super(props)
        this.state = {
            activeTabIndex: 0
        }
        this.onTabItemClick = this.onTabItemClick.bind(this)
    }
    onTabItemClick(index) {
        this.setState({
            activeTabIndex: index
        })
    }
    render() {
        console.log(this.props.children)
        return (
            <div className='tab-container'>
                <TabBar>
                    {
                        this.props.barItems.map(
                            (item, index) => <TabItem key={index} index={index} onClick={this.onTabItemClick}>{item}</TabItem>
                        )
                    }
                </TabBar>
                <Tabs active={this.state.activeTabIndex} tabs={this.props.children} />
            </div>
        )
    }
}

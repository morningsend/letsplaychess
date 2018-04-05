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
        onClick: PropTypes.func,
        active: PropTypes.bool,
    }

    static defaultProps = {
        index: -1,
        children: 'bar button',
        onClick: () => {},
        active: false,
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
        const { children, active } = this.props
        const className = 'tab-bar-button' + (active ? ' active' : '')
        return (
            <button onClick={this.handleClick} className={className}>
                {this.props.children || 'helloworld'}
            </button>
        )
    }
}
const Tabs = (props) => <div className='tabs'>{props.tabs[props.active]}</div>
    

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
        const className = this.props.className || ''
        return (
            <div className={'tabview-container ' + className}>
                <TabBar>
                    {
                        this.props.barItems.map(
                            (item, index) => <TabItem active={index==this.state.activeTabIndex} key={index} index={index} onClick={this.onTabItemClick}>{item}</TabItem>
                        )
                    }
                </TabBar>
                <Tabs active={this.state.activeTabIndex} tabs={this.props.children} />
            </div>
        )
    }
}

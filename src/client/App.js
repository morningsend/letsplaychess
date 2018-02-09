import React from 'react';


export class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: 'World s',
        };
    }
    render() {
        return <h1>hello { this.state.name }</h1>;
    }
}

export default App;

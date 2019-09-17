import React from 'react'
import ReactDOM from 'react-dom'
import { ROUTE_TITLE } from '../consts'

class App extends React.Component {
    render() {
        return (
            <div>
                <p>{ROUTE_TITLE}: Hello, {this.props.name}</p>
                <input type="text" defaultValue={this.props.name} onChange={this.props.onChange} />
                {this.props.children}
            </div>
        )
    }
}

export default App
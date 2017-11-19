import React from 'react';
import Register from './register'
import Login from './login'


export default class Welcome extends React.Component{
    render() {
        return(
            <div id="welcome-c">
                <div id="welcome-cc">
                    <h1>Welcome Component</h1>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

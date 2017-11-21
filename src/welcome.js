import React from 'react';
import Register from './register'
import Login from './login'
import Logo from './logo'
import Footer from './footer'
import { Link } from 'react-router'

export default class Welcome extends React.Component{
    render() {
        return(
            <div id="welcome-c">
                <div id="welcome-cc">
                <Logo />
                    <h1>
                        <Link className='to-login' to='/login'>Sign in</Link>
                    </h1>
                    {this.props.children}
                    <Footer />
                </div>
            </div>
        )
    }
}

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
                    <h1 className='welcome-h'>
                    <Logo />
                        <Link className='to-login' to='/login'>SIGN IN</Link>
                        <Link className='to-register' to='/register'>SIGN UP</Link>
                    </h1>
                    {this.props.children}
                    <Footer />
                </div>
            </div>
        )
    }
}

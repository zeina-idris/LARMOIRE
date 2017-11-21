import React from 'react';
import {Link} from 'react-router';
import axios from 'axios';
import Register from './register';


export default class Login extends React.Component{
    constructor(props){
        super (props)
        this.state = {}
    }
    submit() {
        axios.post('/login', {
            email: this.refs.email.value,
            password: this.refs.password.value
        }).then(resp => {
            if (resp.data.success) {
                location.replace('/')
            } else {
                this.setState({
                    error: true
                })
            }
        });
    }
    render() {
        return(
            <div id='loginbody'>
            <div className='loginbody'>
                <div id='login-c'>
                    <div id='login'>
                    {this.state.error && <p style={{color:"red"}}>Something went wrong</p>}
                        <h1 className='login_text'>Log in</h1>
                        <input className='input' type='email' ref='email' placeholder='Email' />
                        <input className='input' type='password' ref='password' placeholder='Password' />
                        <button  onClick={() => this.submit()}>LOG IN</button>
                        <h3> If you're not a member already, Join us!</h3>
                        <Link className='login-signup' to="/register">SIGN UP</Link>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}

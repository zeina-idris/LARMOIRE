import React from 'react';
import { Link } from 'react-router'


export default class Logo extends React.Component {
    render() {
        return (
            <div>
            <Link  className='logo' to='/'> <img className='logo' src='public/images/hanger copy.png' /></Link>
            </div>
        )
    }
}

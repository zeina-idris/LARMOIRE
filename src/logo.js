import React from 'react';
import { Link } from 'react-router'


export default class Logo extends React.Component {
    render() {
        return (
            <div id='logo'>
                <a href='/'>
                <p  className='logo'>L'ARMOIRE</p>
                </a>
            </div>
        )
    }
}

import React from 'react'
import { Link } from 'react-router'

export default class Home extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div id='home'>
                <div className="header">
                <button className='discover'><Link to='/login'>SHOP NOW</Link></button>
                </div>
                <div className="header1">
                </div>
                <div className="header2">
                </div>
                <br></br>
                <div className="header3">
                </div>
                <div className="header4">
                </div>
                <div className="header5">
                </div>
            </div>
        )
    }
}

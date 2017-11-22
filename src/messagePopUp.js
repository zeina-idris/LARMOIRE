import React from 'react'


export default class MessagePopUp extends React.Component{
    constructor(props){
        super(props)
        console.log(this.props.zeina)

    }

    visibilityClass(){
        return this.props.isHidden  ? 'hide' : ''
    }

    render(){
        return(
            <div className={this.visibilityClass()}>
            something hilarious inside the div
            </div>
        )
    }
}

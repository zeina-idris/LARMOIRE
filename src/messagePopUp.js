import React from 'react'
import axios from 'axios'


export default class MessagePopUp extends React.Component{
    constructor(props){
        super(props)
    }

    visibilityClass(){
        return this.props.isHidden  ? 'hide' : ''
    }

    handleKeyPress(e) {
      if (e.key === 'Enter') {
        let message = e.target.value
        e.target.value = "";
            console.log(this.props.product);
        axios.post('/messages', {
            product_id: this.props.product.id,
            content: message,
            recipient_id: this.props.product.userid
        })
      }
    }

    render(){
        return(
            <div className={this.visibilityClass()}>
            <textarea id="chat-message" placeholder="Type a message..." onKeyPress={(e) => this.handleKeyPress(e)}></textarea>
            </div>
        )
    }
}

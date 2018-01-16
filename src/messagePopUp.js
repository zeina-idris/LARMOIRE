import React from 'react'
import axios from 'axios'


export default class MessagePopUp extends React.Component{
    constructor(props){
        super(props)
    }

    visibilityClass(){
        return this.props.isHidden  ? 'hide' : ''
    }

    onChange(e) {
        this.newMessage = e.target.value
    }

    submit(){
        axios.post('/messages', {
            product_id: this.props.product.id,
            content: this.newMessage,
            recipient_id: this.props.product.user_id
        })
        this.props.hideMessageView()
    }

    render(){
        return(
            <div className={this.visibilityClass()}>
            <div>
                <div id="openModal" className="modalDialog">
                    <div>
                    	<a href="#close" title="Close" className="close">X</a>
                        <p className='modalText'>Send a message</p>
                        <p>Send a message to the owner of this product
                        to get more information </p>
                        <textarea id="chat-message" placeholder="Type a message..." onChange={(e) => this.onChange(e)}></textarea><br></br>
                        <button  onClick={() => this.submit()} className='sendBtn'>Send message</button>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}

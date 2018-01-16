import React from 'react'
import axios from 'axios'


export default class SingleMessage extends React.Component{
    constructor(props){
        super(props)
        this.state={}
    }


    handleSubmit(e) {
      console.log('running handle submit', this.props);
      let message = e.target.value
      e.target.value = "";
      console.log('stuff',this.props.product_id);
      axios.post('/messages', {
          product_id: this.state.message.product_id,
          content: message,
          recipient_id: this.state.message.sender_id
      })
    }

    componentDidMount(){
        axios.get('/message/' + this.props.params.id + '/data')
        .then((r) => {
            console.log(r.data.message);
            this.setState({
                message : r.data.message
            })
        })
    }

    render(){
        if(!this.state.message){
            return null
        }
        return(
            <div>
                <div id='single_msg'>
                <div id="chat-container">
                    <h1 className='sender'>Message from {this.state.message.first} {this.state.message.last}</h1> <br></br>
                    <h1 className='messageContent'>{this.state.message.content}</h1></div>
                    <textarea id="chat-message" placeholder="Reply to this message..." onKeyDown={e => {e.keyCode == 13&& this.handleSubmit(e)} }></textarea>
                </div>
            </div>
        )
    }
}

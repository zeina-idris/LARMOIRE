import React from 'react'
import axios from 'axios'


export default class SingleMessage extends React.Component{
    constructor(props){
        super(props)
        this.state={}
    }

    componentDidMount(){
        axios.get('/message/' + this.props.params.id + '/data')
        .then((r) => {
            console.log(JSON.stringify(r.data));
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
                    <textarea id="chat-message" placeholder="Type a message..." onKeyPress={(e) => this.handleKeyPress(e)}></textarea>
                </div>
            </div>
        )
    }
}

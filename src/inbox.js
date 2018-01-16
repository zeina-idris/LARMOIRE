import React from 'react'
import axios from 'axios'
import { Link } from 'react-router'

export default class Inbox extends React.Component{
    constructor(props){
        super(props)
        this.state={
            messages: []
        }
    }

    componentDidMount(){
        axios.get('/messages')
        .then((r) =>{
            console.log(r.data.messages);
            this.setState({
                messages: r.data.messages
            })
        })
    }

    render(){
        console.log('running render', this.state);
        if(!this.state.messages){
            return(
                <div>
                    LOADING ....
                </div>
            )
        }
        const theMsgs = this.state.messages.map((message) =>{
            console.log(message);
            return(
                <div key={message.id}>
                    <div id='individual'>
                    <a href={`/message/${message.id}`}>
                    <p id='name'>{message.first} {message.last}: </p>
                            <p id='message'>{message.content}</p>
                        </a>
                    </div>
                </div>
            )
        })
        return(
            <div id='inboxbody'>
                <div className='inboxbody'>
                <div className='main-inbox-c'>
                    <div className='messagesContainer'>
                        <h2 className='inboxtext'>Inbox</h2>
                            <h1 className='in'>
                            {theMsgs}
                            </h1>
                        </div>
                    </div>
                    </div>
                </div>
        )
    }
}

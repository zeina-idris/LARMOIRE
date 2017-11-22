import React from 'react'
import axios from 'axios'
import MessagePopUp from './messagePopUp'

export default class SingleProductView extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            messagesHidden: true,
            product: null
        }

        this.toggleMessageView = this.toggleMessageView.bind(this)
    }

    componentDidMount(){
        axios.get('/product/' + this.props.params.id)
        .then((r) => {
            this.setState({
                product: r.data.product
            })
        })
    }

    toggleMessageView(){
        this.setState({
            messagesHidden: false
        })
    }

    render(){
        if(!this.state.product){
            return(<div></div>)
        }
        return(
            <div>
                <div className='SPV'>
                    <img src={this.state.product.image} />
                    <div className='SPV_info'>
                        <h3>{this.state.product.brand} </h3>
                        <p>{this.state.product.price}€ </p>
                        <button onClick={this.toggleMessageView} className='messageButton'>Send a message</button>
                    </div>
                    <MessagePopUp
                        isHidden={this.state.messagesHidden}
                    />
                </div>
            </div>
        )
    }

}

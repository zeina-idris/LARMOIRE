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

        this.showMessageView = this.showMessageView.bind(this)
        this.hideMessageView = this.hideMessageView.bind(this)
    }

    componentDidMount(){
        axios.get('/product/' + this.props.params.id)
        .then((r) => {
            this.setState({
                product: r.data.product
            })
        })
    }


    hideMessageView(){
        this.setState({
            messagesHidden: true
        })
    }

    showMessageView(){
        this.setState({
            messagesHidden: false
        })
    }

    render(){
        if(!this.state.product){
            return(<div></div>)
        }
        return(
            <div id='SPV_container'>
                <div className='SPVbody'>
                <div className='SPV'>
                    <img src={this.state.product.image} />
                    <div className='SPV_info'>
                        <h3>{this.state.product.brand} </h3>
                        <p>{this.state.product.price}€ per day</p>
                        <a  onClick={this.showMessageView} className='messageButton' href="#openModal">Send a message</a>
                    </div>

                    <MessagePopUp
                        product={this.state.product}
                        isHidden={this.state.messagesHidden}
                        hideMessageView={this.hideMessageView}
                    />

                </div>
                </div>
            </div>
        )
    }

}

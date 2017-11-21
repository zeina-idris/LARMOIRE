import React from 'react'
import axios from 'axios'

export default class SingleProductView extends React.Component{
    constructor(props) {
        super(props)
        this.state={}
    }

    componentDidMount(){
        axios.get('/product/' + this.props.params.id)
        .then((r) => {
            this.setState({
                product: r.data.product
            })
        })
    }

    render(){
        if(!this.state.product){
            return null
        }
        return(
            <div>
                <div className='SPV'>
                    <img src={this.state.product.image} />
                    <div className='SPV_info'>
                        <h3>{this.state.product.brand} </h3>
                        <p>{this.state.product.price}€ </p>
                    </div>
                </div>
            </div>
        )
    }

}

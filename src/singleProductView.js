import React from 'react'
import PRODUCT_DATABASE from './database'

export default class SingleProductView extends React.Component{
    constructor(props) {
        super(props)
    }

    findProduct(productId){
        return PRODUCT_DATABASE.find((item) => {
            return item.id == productId
        })
    }

    render(){
        return(
            <div>
                <h2>{this.findProduct(this.props.params.productId).title}</h2>
                <img src={this.findProduct(this.props.params.productId).image} />
            </div>
        )
    }

}

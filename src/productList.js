import React from 'react'
import Card from './card'
import {browserHistory} from 'react-router'
import PRODUCT_DATABASE from './database'

export default class ProductList extends React.Component{
    constructor(props){
        super(props)
    }

    cardPressed(productId){
        return () => {
            console.log('we see cardPressed', productId);
                browserHistory.push('/products/' + productId)
        }
    }


    render(){
        return(
            <div>
              {
                  PRODUCT_DATABASE.map((item, index) => {
                      return <Card key={index} cardPressed={this.cardPressed(item.id)} product={item} />
                  })
              }
            </div>
        )
    }
}

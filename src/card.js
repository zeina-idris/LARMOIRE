import React from 'react'

export default class Card extends React.Component{
    constructor(props){
        super(props)
    }
    
    render() {
        return(
            <div>
                <h2 onClick={this.props.cardPressed}>{this.props.product.title}</h2>
                <img src={this.props.product.image} />
            </div>
        )
    }
}

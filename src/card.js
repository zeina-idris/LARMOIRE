import React from 'react'

export default class Card extends React.Component{
    constructor(props){
        super(props)
    }

    render() {
        return(
            <div className='cards_container'>
                <div className='card_container' onClick={this.props.cardPressed}>
                    <img src={this.props.product.image} />
                    <h2>{this.props.product.brand}</h2>
                </div>
            </div>
        )
    }
}

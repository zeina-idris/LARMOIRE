import React from 'react'
import ProductList from './productList'

export default class App extends React.Component{
    constructor(props){
        super (props)
    }
    render(){
        return(
            <div>
                <h2>HEY</h2>
                <ProductList />
            </div>
        )
    }

}

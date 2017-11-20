import React from 'react'
import ProductList from './productList'

export default class App extends React.Component{
    constructor(props){
        super (props)
    }
    render(){
        return(
            <div>
                <div id='header'>
                <div className='header_elements'>
                <li>shop</li>
                <li>contact</li>
                <li>about</li>
                </div>
                </div>
                <ProductList />
            </div>
        )
    }

}

import React from 'react'
import ProductList from './productList'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import MyDropDownMenu from './dropDownMenu'
import {Link} from 'react-router'
import Logo from './logo'


export default class App extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        const clonedChildren = React.cloneElement(
            this.props.children, {

            }
        )
        return(
            <div>
                <MuiThemeProvider>
                    <div>
                        <div id='header'>
                            <div className='header_elements'>
                                <Logo />
                                <MyDropDownMenu />
                            </div>
                        </div>

                        {clonedChildren}
                    </div>
                </MuiThemeProvider>
            </div>
        )
    }

}

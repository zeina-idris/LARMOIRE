import React from 'react';
import axios from 'axios';
import {browserHistory} from 'react-router'

export default class UploadProduct extends React.Component{
    constructor(props){
        console.log('inside the const of upload product');
        super (props);
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e){
        this[e.target.name] = e.target.value
    }

    handleSubmit(e){
        var element = document.getElementById('file').files[0]
        const formData = new FormData();
        formData.append('file', element)
        formData.append('brand', this.brand)
        formData.append('price', this.price)
        axios.post('/uploadSingleProduct', formData
        ).then((result) => {
            if(result.data.success){
                browserHistory.push('/')
            }
        })
    }

    render(){
        return (
            <div id='uploadbody'>
            <div className='loginbody'>
                <div className='main-upload-c'>
                    <div className="upload-c">
                        <h2>Rent a Product</h2>
                        <h3>Upload product image</h3>
                        <label className="upload-btn" htmlFor="file"></label>
                        <input onChange={(e) => this.handleChange(e)} type="text" name="brand" placeholder="Brand" />
                        <input onChange={(e) => this.handleChange(e)} type="text" name="price" placeholder="0.00€ per day" />
                        <input type='file' id='file' />
                        <button onClick={this.handleSubmit} className="upload-btn">Upload</button>
                    </div>
                </div>
            </div>
            </div>
        );
    }
}

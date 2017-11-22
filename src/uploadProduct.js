import React from 'react';
import axios from 'axios';

export default class UploadProduct extends React.Component{
    constructor(props){
        console.log('inside the const of upload product');
        super (props);
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(e){
        var element = document.getElementById('file').files[0]
        const formData = new FormData();
        formData.append('file', element)
        axios.post('/uploadSingleProduct', formData
        ).then((result) => {
            if(result.data.success){
                var data = result.data;
                var url = data.url;
                this.props.setImage(url);
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
                        <input type="text" name="brand" placeholder="Brand" />
                        <input type="text" name="price" placeholder="0.00€" />
                        <input type='file' id='file' />
                        <button onClick={this.handleSubmit} className="upload-btn">Upload</button>
                    </div>
                </div>
            </div>
            </div>
        );
    }
}

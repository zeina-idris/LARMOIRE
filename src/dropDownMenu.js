import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { Link } from 'react-router'

const styles = {
  customWidth: {
    width: 200,
  },
};

export default class MyDropDownMenu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: 1};

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e, index, value){
    this.setState({value});
  }

  render() {
    return (
      <div>
        <DropDownMenu
         className='dropDownMenu'
          value={this.state.value}
          onChange={this.handleChange}
          style={styles.customWidth}
          autoWidth={false}
        >
          <MenuItem value={1} primaryText="Menu"/>
          <MenuItem value={2} primaryText="Lend a product"
          containerElement={<Link to='/uploadProduct' className='upload_img'>Lend a Product</Link>} />
          <MenuItem value={3} primaryText="Contact"
          containerElement={<a href='/Contact'> </a>}/>
          <MenuItem value={4} primaryText="Log out"
          containerElement={<a href='/logout'> </a>}/>
        </DropDownMenu>


      </div>
    );
  }
}

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

class AddressBar extends Component {
  render() {
    return (
      <div>
        <input style={{width: '90%'}} />
        <button onMouseDown={(e) => {
          var instance = axios.create({
            baseURL: 'https://api.esa.io',
            timeout: 1000,
            headers: {
              'Authorization': 'Bearer a768efa2acb0757e4621b2902bf4364afa959d77185b7d8fbb1e46a8b66c8ef8'
            }
          });
          instance.get('/v1/teams/okonomi/posts/343')
            .then((response) => {
              console.log(response);

              this.props.onLoad(response);
            })
            .catch((error) => {
              console.log(error);
            });
        }}>Load</button>
      </div>
    );
  }
}

AddressBar.propTypes = {
  onLoad: PropTypes.func.isRequired,
};

export default AddressBar;

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MyEditor from './MyEditor';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>esabako</h2>
        </div>
        <p className="App-intro">
          esabako is esa.io client
        </p>

        <MyEditor />
      </div>
    );
  }
}

export default App;

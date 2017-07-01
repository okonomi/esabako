import React, { Component } from 'react';
import './App.css';
import MyEditor from './MyEditor';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <span className="App-logo" role="img" aria-labelledby="logo">🐔</span>
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

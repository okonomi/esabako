import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import MyEditor from './MyEditor';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

// ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<MyEditor />, document.getElementById('root'));
registerServiceWorker();

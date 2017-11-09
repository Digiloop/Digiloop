import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// debug tools, don't leave in live version
window.React = React
// window.store = store









ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

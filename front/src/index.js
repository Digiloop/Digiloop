import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import C from './constants'
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'
import storeFactory from './store'

// debug tools, don't leave in live version
window.React = React
//window.Store = store









ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

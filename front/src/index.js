import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import App from './components/containers/App'
import C from './constants'
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'
import storeFactory from './store'
import sampleData from './initialState'

// debug tools, don't leave in live version
window.React = React
window.Store = store

const initialState = sampleData

const store = storeFactory(initialState)







ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

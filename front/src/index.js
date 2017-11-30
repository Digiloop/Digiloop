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



const initialState = sampleData

const saveState = () =>
    localStorage["redux-store"] = JSON.stringify(store.getState())

const store = storeFactory(initialState)


// debug tools, don't leave in live version
window.React = React
window.Store = store




ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();

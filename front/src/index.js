import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/containers/App'
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'
import storeFactory from './store'
import initialState from './initialState'




const saveState = () =>
    localStorage["redux-store"] = JSON.stringify(store.getState())

console.log(saveState);

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

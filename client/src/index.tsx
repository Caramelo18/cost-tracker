import React from 'react';
import ReactDOM from 'react-dom';
import './fonts.css';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import App from './components/app/App';
import * as serviceWorker from './serviceWorker';

import { createStore } from 'redux';
import { rootReducer } from './store/index';

const store = createStore(rootReducer);

ReactDOM.render(<App store={store}/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

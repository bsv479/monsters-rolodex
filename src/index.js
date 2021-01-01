import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, combineReducers} from "redux";
import {createLogger} from "redux-logger";
import {searchMonsters, requestMonsters} from "./redux/reducers";
import thunkMiddleware from 'redux-thunk';
import './index.css';
import App from './App';

const logger = createLogger();
const rootReducer = combineReducers({searchMonsters, requestMonsters});
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, logger));

ReactDOM.render(
    <Provider store={store}>
      <App/>
    </Provider>, document.getElementById('root')
);
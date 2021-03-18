import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

// REDUX

// ACTIOn
const index = (new_index:number) =>{ return { type: 'INDEX', payload:new_index } }

// REDUCEr
const change_index = (state={index:0}, action:any) =>{
        console.log("YESSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS", action)
        return {...state, index:action.payload}

}
// REDUX END
const store = configureStore({ reducer: change_index}); 

console.log("DESTNIY               ", store.getState())
store.dispatch(index(4))
console.log("DESTNIY               ", store.getState())
// <React.StrictMode>
ReactDOM.render(
        <Provider store={store}>
                <App />
        </Provider>,
        document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

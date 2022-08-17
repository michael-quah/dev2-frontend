import React from 'react';
//import ReactDOM from 'react-dom'; // For react 17
// For react 18: 
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { FronteggProvider } from '@frontegg/react';
import reportWebVitals from './reportWebVitals';

const contextOptions = {
  baseUrl: `${process.env.REACT_APP_BASEURL}`,
  clientId: `${process.env.REACT_APP_CLIENTID}`
};


// For react 18: 
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <FronteggProvider contextOptions={contextOptions} hostedLoginBox={true}>
        <App />
    </FronteggProvider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
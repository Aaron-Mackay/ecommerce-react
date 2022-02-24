import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import Amplify from 'aws-amplify';
// import config from './aws-exports';
import 'bootstrap/dist/css/bootstrap.min.css';
import ShoppingCartProvider from "./ShoppingCartContext";

// Amplify.configure(config);

ReactDOM.render(
        <React.StrictMode>
            <ShoppingCartProvider>
                <App/>
            </ShoppingCartProvider>
        </React.StrictMode>,
        document.getElementById('root')
);

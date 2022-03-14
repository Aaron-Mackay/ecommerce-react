import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import Amplify from 'aws-amplify';
import config from './aws-exports';
import 'bootstrap/dist/css/bootstrap.min.css';

Amplify.configure(config); // Comment out for local only function

ReactDOM.render(
        <React.StrictMode>
            <App/>
        </React.StrictMode>,
        document.getElementById('root')
);

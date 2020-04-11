import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter as Router} from "react-router-dom";
import 'antd/dist/antd.css';
import {Provider} from "react-redux";
import tootState from "./configureStore";

ReactDOM.render(
    <Provider store={tootState}>
        <Router>
            <App/>
        </Router>
    </Provider>,
    document.getElementById('root')
);

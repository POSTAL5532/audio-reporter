import React from 'react';
import ReactDOM from 'react-dom';
import {createBrowserHistory} from "history";
import App from 'App';
import {Router} from "react-router-dom";
import {Provider} from "react-redux";
import 'antd/dist/antd.css';
import tootState from "storeConfig";

export const browserHistory = createBrowserHistory();

ReactDOM.render(
    <Provider store={tootState}>
        <Router history={browserHistory}>
            <App/>
        </Router>
    </Provider>,
    document.getElementById('root')
);

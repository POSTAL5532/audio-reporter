import React from 'react';
import ReactDOM from 'react-dom';
import App from './container/application/App';
import {Router} from "react-router-dom";
import 'antd/dist/antd.css';
import {Provider} from "react-redux";
import tootState from "./configureStore";
import {createBrowserHistory} from "history";

export const browserHistory = createBrowserHistory();

ReactDOM.render(
    <Provider store={tootState}>
        <Router history={browserHistory}>
            <App/>
        </Router>
    </Provider>,
    document.getElementById('root')
);

import React from 'react';
import ReactDOM from 'react-dom';
import {createBrowserHistory} from "history";
import App from 'container/application/App';
import {Router} from "react-router-dom";
import {Provider} from "react-redux";
import tootState from "store/configureStore";
import 'antd/dist/antd.css';

export const browserHistory = createBrowserHistory();

ReactDOM.render(
    <Provider store={tootState}>
        <Router history={browserHistory}>
            <App/>
        </Router>
    </Provider>,
    document.getElementById('root')
);

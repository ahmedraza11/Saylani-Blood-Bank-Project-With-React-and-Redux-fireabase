import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './store'
import App from './components/App/App';
import Routes from './Routes';
import './config/config';
import 'semantic-ui-css/semantic.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Provider store={store}>
        <Routes />
    </Provider>
    ,
    document.getElementById('root')
);
registerServiceWorker();

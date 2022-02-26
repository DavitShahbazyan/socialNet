import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './helpers/store';
import i18next from 'i18next';

import "./i18nextInit";

const lang = localStorage.getItem('i18nextLng');
console.log(lang);
i18next.changeLanguage(lang);

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>,
    document.getElementById('root')
);


import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import "./index.css"
import Store from './store.jsx'
import { Helmet, HelmetProvider } from 'react-helmet-async';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={Store}>
    <HelmetProvider>

  <BrowserRouter>
    <App />
  </BrowserRouter>
    </HelmetProvider>
  </Provider>
)

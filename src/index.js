import React from 'react';
import App from './components/App';
import './style.css';
import { store } from "./components/store";
import { Provider } from "react-redux";
import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Provider store={store}><App tab="home" /></Provider>);



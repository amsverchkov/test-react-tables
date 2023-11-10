import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import './index.css';
import App from './components/app/App';
import { AppContextProvider } from './context/AppContext';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </React.StrictMode>
);

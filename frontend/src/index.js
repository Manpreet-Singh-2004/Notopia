import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { NoteContextProvider } from './context/NoteContext';
import { AuthContextProvider } from './context/AuthContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
    <NoteContextProvider>
      <App />
    </NoteContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
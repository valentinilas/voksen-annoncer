import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// import { AuthProvider } from './lib/auth-context.jsx'

import { AuthProvider } from './lib/auth-context.jsx';
import { ThemeProvider } from './lib/theme-context.jsx';

// Languages
import i18n from './translations/i18n.js';
import { I18nextProvider } from 'react-i18next';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>
)

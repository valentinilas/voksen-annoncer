import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// import { AuthProvider } from './lib/auth-context.jsx'

import { AuthProvider } from './lib/auth-context.jsx';
import { ThemeProvider } from './lib/theme-context.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>
)

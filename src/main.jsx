// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import VoteProvider from './Context/VoteProvider.jsx'

createRoot(document.getElementById('root')).render(
  <VoteProvider>
    <App />
  </VoteProvider>,
)
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'stream-chat-react/dist/css/v2/index.css';
import './index.css'
import App from './App.jsx'

import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

const savedTheme = localStorage.getItem("chattify-theme") || "forest";
document.documentElement.setAttribute("data-theme", savedTheme);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
)

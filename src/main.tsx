import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { QueryClientProvider } from 'react-query'
import queryClient from './query-client'
import { ReactQueryDevtools } from 'react-query/devtools'



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <App />
    <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>
)

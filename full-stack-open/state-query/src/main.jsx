import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { CounterContextProvider } from './context/CounterContext.jsx'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <CounterContextProvider>
        <App />
      </CounterContextProvider>
    </QueryClientProvider>
  </StrictMode>,
)

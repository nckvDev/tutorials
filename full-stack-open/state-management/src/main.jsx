import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import App from './App.jsx'

import noteReducer, { createNote } from './reducers/noteReducer'
import filterReducer, { filterChange } from './reducers/filterReducer'

const store = configureStore({
  reducer: {
    notes: noteReducer,
    filter: filterReducer
  }
})

console.log(store.getState())

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)

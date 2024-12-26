import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { combineReducers, legacy_createStore as createStore } from 'redux'
import { Provider } from 'react-redux'

import App from './App.jsx'
import noteReducer, { createNote } from './reducers/noteReducer'
import filterReducer, { filterChange } from './reducers/filterReducer'

const reducer = combineReducers({
  notes: noteReducer,
  filter: filterReducer
})

const store = createStore(reducer)

console.log(store.getState())

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)

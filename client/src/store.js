import { createStore, compose, combineReducers } from 'redux'
import currentNoteReducer from './reducers/currentNoteReducer'
import settingsReducer from './reducers/settingsReducer'

const rootReducer = combineReducers({
  currentNote: currentNoteReducer,
  settings: settingsReducer
})

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store

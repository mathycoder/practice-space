import { createStore, compose, combineReducers } from 'redux'
import currentNoteReducer from './reducers/currentNoteReducer'

const rootReducer = combineReducers({
  currentNote: currentNoteReducer
})

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store

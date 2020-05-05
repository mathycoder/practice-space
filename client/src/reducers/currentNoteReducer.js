import { combineReducers } from 'redux'

const currentNoteReducer = combineReducers({
  current: currentReducer,
  next: nextReducer,
})


function currentReducer(state = null, action) {
  switch(action.type) {
    case 'SET_CURRENT_NOTE':
      return action.note

    default:
      return state;
  }
}

function nextReducer(state = null, action) {
  switch(action.type) {
    case 'SET_NEXT_NOTE':
      return action.note

    default:
      return state;
  }
}



export default currentNoteReducer

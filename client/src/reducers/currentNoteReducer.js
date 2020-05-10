import { combineReducers } from 'redux'

const currentNoteReducer = combineReducers({
  current: currentReducer,
  next: nextReducer,
  scaleTone: scaleToneReducer
})


function currentReducer(state = null, action) {
  switch(action.type) {
    case 'SET_CURRENT_NOTE':
      return action.note

    case 'RESET_INDEX':
      return null

    default:
      return state;
  }
}

function nextReducer(state = null, action) {
  switch(action.type) {
    case 'SET_NEXT_NOTE':
      return action.note

    case 'RESET_INDEX':
      return null

    default:
      return state;
  }
}

function scaleToneReducer(state = 1, action) {
  switch(action.type) {
    case 'SET_SCALE_TONE':
      return action.tone

    case 'RESET_INDEX':
      return 1

    default:
      return state;
  }
}



export default currentNoteReducer

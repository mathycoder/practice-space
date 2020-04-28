function currentNoteReducer(state = null, action) {
  switch(action.type) {
    case 'SET_CURRENT_NOTE':
      return action.note
    
    default:
      return state;
  }
}

export default currentNoteReducer

export function setCurrentNote(note){
  return {type: 'SET_CURRENT_NOTE', note: note}
}

export function setNextNote(note){
  return {type: 'SET_NEXT_NOTE', note: note}
}

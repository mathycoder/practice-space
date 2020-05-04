export function setKey(key){
  return {type: 'SET_KEY', key: key}
}

export function setBPM(bpm){
  return {type: 'SET_BPM', bpm: bpm}
}

export function nextIndex(){
  return {type: 'NEXT_INDEX'}
}

export function resetIndex(){
  return {type: 'RESET_INDEX'}
}

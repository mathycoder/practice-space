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

export function setInstrument(instrument){
  return {type: 'SET_INSTRUMENT', instrument: instrument}
}

export function setLooping(looping){
  return {type: 'SET_LOOPING', looping: looping}
}

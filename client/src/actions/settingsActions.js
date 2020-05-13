export function setKey(key, scaleType){
  return {type: 'SET_KEY', key: key, scaleType: scaleType}
}

export function setScaleShape(scaleShape){
  return {type: 'SET_SHAPE', scaleShape: scaleShape}
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

export function isLoading(){
  return {type: 'IS_LOADING'}
}

export function doneLoading(){
  return {type: 'DONE_LOADING'}
}

export function setScaleRepetition(repetition){
  return {type: 'SET_SCALE_REPETITION', repetition: repetition}
}

export function setKey(key, scaleType, scaleShape, scaleRepetition){
  return {type: 'SET_KEY', key: key, scaleType: scaleType, scaleShape: scaleShape, scaleRepetition: scaleRepetition}
}

// export function setScaleRepetition(repetition){
//   return {type: 'SET_SCALE_REPETITION', repetition: repetition}
// }

// export function setScaleShapeAndRepetition(scaleShape, scaleRepetition){
//   return {type: 'SET_SCALE_SHAPE_AND_REPETITION', scaleShape: scaleShape, scaleRepetition: scaleRepetition}
// }

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

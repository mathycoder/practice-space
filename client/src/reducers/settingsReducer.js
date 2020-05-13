import { combineReducers } from 'redux'

const settingsReducer = combineReducers({
  instrument: instrumentReducer,
  key: keyReducer,
  keyNotes: keyNotesReducer,
  category: categoryReducer,
  bpm: bpmReducer,
  scale: scaleReducer,
  scaleIndex: scaleIndexReducer,
  scaleType: scaleTypeReducer,
  scaleShape: scaleShapeReducer,
  scaleRepetition: scaleRepetitionReducer,
  accidentals: accidentalsReducer,
  looping: loopingReducer,
  loading: loadingReducer
})

export default settingsReducer


function loadingReducer(state = false, action){
  switch(action.type) {
    case 'IS_LOADING':
      return true

    case 'DONE_LOADING':
      return false

    default:
      return state;
  }
}

function loopingReducer(state = false, action){
  switch(action.type) {
    case 'SET_LOOPING':
      return action.looping

    default:
      return state;
  }
}

function instrumentReducer(state = 'Note Names', action) {
  switch(action.type) {
    case 'SET_INSTRUMENT':
      return action.instrument

    default:
      return state;
  }
}

function keyReducer(state = 'C', action) {
  switch(action.type) {
    case 'SET_KEY':
      //if (!keyNotesObj[action.key][action.scaleType]) return state
      return action.key

    default:
      return state;
  }
}

function scaleTypeReducer(state = 'major', action){
  switch(action.type) {
    case 'SET_KEY':
      //if (!keyNotesObj[action.key][action.scaleType]) return state
      return action.scaleType

    default:
      return state;
  }
}

function scaleShapeReducer(state = 'Ascending and Descending', action){
  switch(action.type) {
    case 'SET_SCALE_SHAPE_AND_REPETITION':
      //if (!keyNotesObj[action.key][action.scaleType]) return state
      return action.scaleShape

    default:
      return state;
  }
}

function scaleRepetitionReducer(state = "None", action){
  switch(action.type) {
    case 'SET_SCALE_SHAPE_AND_REPETITION':
      return action.scaleRepetition

    default:
      return state;
  }
}

function categoryReducer(state = 'sharps', action) {
  switch(action.type) {
    case 'SET_KEY':
//      if (!keyNotesObj[action.key][action.scaleType]) return state

      //const scaleTypeKey = (action.scaleType).includes("minor") ? 'nat. minor' : 'major'

      const notes = keyNotesObj[action.key][action.scaleType]
      const sharps = notes.filter(note => note[1] === '#')
      const flats = notes.filter(note => note[1] === 'b')
      return sharps.length > 0 ? 'sharps' : (flats.length > 0 ? 'flats' : 'sharps')

    default:
      return state;
  }
}


function keyNotesReducer(state=['c/4', 'd/4', 'e/4', 'f/4', 'g/4', 'a/4', 'b/4', 'c/5' ], action){
  switch(action.type) {
    case 'SET_KEY':
    //  if (!keyNotesObj[action.key][action.scaleType]) return state

      //const scaleTypeKey = (action.scaleType).includes("minor") ? 'nat. minor' : 'major'
      return keyNotesObj[action.key][action.scaleType]

    default:
      return state;
  }
}

function accidentalsReducer(state=0, action){
  switch(action.type) {
    case 'SET_KEY':
  //    if (!keyNotesObj[action.key][action.scaleType]) return state
      // const scaleTypeKey = (action.scaleType).includes("minor") ? 'nat. minor' : 'major'
      return countAccidentals(action.key, action.scaleType)

    default:
      return state;
  }
}

function bpmReducer(state = 90, action) {
  switch(action.type) {
    case 'SET_BPM':
      return action.bpm

    default:
      return state;
  }
}

function scaleReducer(state=[0,1,2,3,4,5,6,7,6,5,4,3,2,1], action){
  switch(action.type) {
    case 'SET_REPEAT_TOP_NOTE':
      return action.repeat ? [0,1,2,3,4,5,6,7,7,6,5,4,3,2,1,0] : [0,1,2,3,4,5,6,7,6,5,4,3,2,1]

// [0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,6,6,5,5,4,4,3,3,2,2,1,1]

    case 'SET_SCALE_SHAPE_AND_REPETITION':
      return generateScale[action.scaleShape][action.scaleRepetition]

    default:
      return state;
  }
}

function scaleIndexReducer(state=0, action){
  switch(action.type) {
    case 'NEXT_INDEX':
      return state + 1

    case 'RESET_INDEX':
      return 0

    default:
      return state;
  }
}

const generateScale = {
  "Ascending and Descending": {
    "None": [0,1,2,3,4,5,6,7,6,5,4,3,2,1],
    "Top and Bottom": [0,1,2,3,4,5,6,7,7,6,5,4,3,2,1,0],
    "All 2x": [0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,6,6,5,5,4,4,3,3,2,2,1,1],
    "All 3x": [0,0,0,1,1,1,2,2,2,3,3,3,4,4,4,5,5,5,6,6,6,7,7,7,6,6,6,5,5,5,4,4,4,3,3,3,2,2,2,1,1,1],
    "All 4x": [0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,6,6,6,6,7,7,7,7,6,6,6,6,5,5,5,5,4,4,4,4,3,3,3,3,2,2,2,2,1,1,1,1],
  },
  "Ascending": {
    "None": [0,1,2,3,4,5,6,7],
    "Top and Bottom": [0,0,1,2,3,4,5,6,7,7],
    "All 2x": [0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7],
    "All 3x": [0,0,0,1,1,1,2,2,2,3,3,3,4,4,4,5,5,5,6,6,6,7,7,7],
    "All 4x": [0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,6,6,6,6,7,7,7,7],
  },
  "Descending": {
    "None": [0,1,2,3,4,5,6,7].reverse(),
    "Top and Bottom": [0,0,1,2,3,4,5,6,7,7].reverse(),
    "All 2x": [0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7].reverse(),
    "All 3x": [0,0,0,1,1,1,2,2,2,3,3,3,4,4,4,5,5,5,6,6,6,7,7,7].reverse(),
    "All 4x": [0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,6,6,6,6,7,7,7,7].reverse(),
  }
}

const keyCategory = {
  'C': 'sharps',
  'G': 'sharps',
  'D': 'sharps',
  'A': 'sharps',
  'E': 'sharps',
  'B': 'sharps',
  'F#': 'sharps',
  'C#': 'sharps',
  'F': 'flats',
  'Bb': 'flats',
  'Eb': 'flats',
  'Ab': 'flats',
  'Db': 'flats',
  'Gb': 'flats',
  'Cb': 'flats'
}

const keyNotesObj = {
  'Ab': {
    'major': ['ab/3', 'bb/3', 'c/4', 'db/4', 'eb/4', 'f/4', 'g/4', 'ab/4'],
    'nat. minor': ['ab/3', 'bb/3', 'cb/4', 'db/4', 'eb/4', 'fb/4', 'gb/4', 'ab/4'],
    'harm. minor': ['ab/3', 'bb/3', 'cb/4', 'db/4', 'eb/4', 'fb/4', 'g/4', 'ab/4']
  },
  'A': {
    'major': ['a/3', 'b/3', 'c#/4', 'd/4', 'e/4', 'f#/4', 'g#/4', 'a/4'],
    'nat. minor': ['a/3', 'b/3', 'c/4', 'd/4', 'e/4', 'f/4', 'g/4', 'a/4'],
    'harm. minor': ['a/3', 'b/3', 'c/4', 'd/4', 'e/4', 'f/4', 'g#/4', 'a/4']
  },
  'A#': {
    'major': null,
    'nat. minor': ['a#/3', 'b#/3', 'c#/4', 'd#/4', 'e#/4', 'f#/4', 'g#/4', 'a#/4'],
    'harm. minor': ['a#/3', 'b#/3', 'c#/4', 'd#/4', 'e#/4', 'f#/4', 'gx/4', 'a#/4']
  },
  'Bb': {
    'major': ['bb/3', 'c/4', 'd/4', 'eb/4', 'f/4', 'g/4', 'a/4', 'bb/4'],
    'nat. minor': ['bb/3', 'c/4', 'db/4', 'eb/4', 'f/4', 'gb/4', 'ab/4', 'bb/4'],
    'harm. minor': ['bb/3', 'c/4', 'db/4', 'eb/4', 'f/4', 'gb/4', 'a/4', 'bb/4']
  },
  'B': {
    'major': ['b/3', 'c#/4', 'd#/4', 'e/4', 'f#/4', 'g#/4', 'a#/4', 'b/4'],
    'nat. minor': ['b/3', 'c#/4', 'd/4', 'e/4', 'f#/4', 'g/4', 'a/4', 'b/4'],
    'harm. minor': ['b/3', 'c#/4', 'd/4', 'e/4', 'f#/4', 'g/4', 'a#/4', 'b/4']
  },
  'Cb': {
    'major': ['cb/4', 'db/4', 'eb/4', 'fb/4', 'gb/4', 'ab/4', 'bb/4', 'cb/5' ],
    'nat. minor': null
  },
  'C': {
    'major': ['c/4', 'd/4', 'e/4', 'f/4', 'g/4', 'a/4', 'b/4', 'c/5'],
    'nat. minor': ['c/4', 'd/4', 'eb/4', 'f/4', 'g/4', 'ab/4', 'bb/4', 'c/5'],
    'harm. minor': ['c/4', 'd/4', 'eb/4', 'f/4', 'g/4', 'ab/4', 'b/4', 'c/5']
  },
  'C#': {
    'major': ['c#/4', 'd#/4', 'e#/4', 'f#/4', 'g#/4', 'a#/4', 'b#/4', 'c#/5' ],
    'nat. minor': ['c#/4', 'd#/4', 'e/4', 'f#/4', 'g#/4', 'a/4', 'b/4', 'c#/5' ],
    'harm. minor': ['c#/4', 'd#/4', 'e/4', 'f#/4', 'g#/4', 'a/4', 'b#/4', 'c#/5' ]
  },
  'Db': {
    'major': ['db/4', 'eb/4', 'f/4', 'gb/4', 'ab/4', 'bb/4', 'c/5', 'db/5' ],
    'nat. minor': null
  },
  'D': {
    'major': ['d/4', 'e/4', 'f#/4', 'g/4', 'a/4', 'b/4', 'c#/5', 'd/5'],
    'nat. minor': ['d/4', 'e/4', 'f/4', 'g/4', 'a/4', 'bb/4', 'c/5', 'd/5'],
    'harm. minor': ['d/4', 'e/4', 'f/4', 'g/4', 'a/4', 'bb/4', 'c#/5', 'd/5']
  },
  'D#': {
    'major': null,
    'nat. minor': ['d#/4', 'e#/4', 'f#/4', 'g#/4', 'a#/4', 'b/4', 'c#/5', 'd#/5'],
    'harm. minor': ['d#/4', 'e#/4', 'f#/4', 'g#/4', 'a#/4', 'b/4', 'cx/5', 'd#/5']
  },
  'Eb': {
    'major': ['eb/4', 'f/4', 'g/4', 'ab/4', 'bb/4', 'c/5', 'd/5', 'eb/5'],
    'nat. minor': ['eb/4', 'f/4', 'gb/4', 'ab/4', 'bb/4', 'cb/5', 'db/5', 'eb/5'],
    'harm. minor': ['eb/4', 'f/4', 'gb/4', 'ab/4', 'bb/4', 'cb/5', 'd/5', 'eb/5']
  },
  'E': {
    'major': ['e/3', 'f#/3', 'g#/3', 'a/3', 'b/3', 'c#/4', 'd#/4', 'e/4'],
    'nat. minor': ['e/3', 'f#/3', 'g/3', 'a/3', 'b/3', 'c/4', 'd/4', 'e/4'],
    'harm. minor': ['e/3', 'f#/3', 'g/3', 'a/3', 'b/3', 'c/4', 'd#/4', 'e/4']
  },
  'F': {
    'major': ['f/3', 'g/3', 'a/3', 'bb/3', 'c/4', 'd/4', 'e/4', 'f/4'],
    'nat. minor': ['f/3', 'g/3', 'ab/3', 'bb/3', 'c/4', 'db/4', 'eb/4', 'f/4'],
    'harm. minor': ['f/3', 'g/3', 'ab/3', 'bb/3', 'c/4', 'db/4', 'e/4', 'f/4']
  },
  'F#': {
    'major': ['f#/3', 'g#/3', 'a#/3', 'b/3', 'c#/4', 'd#/4', 'e#/4', 'f#/4'],
    'nat. minor': ['f#/3', 'g#/3', 'a/3', 'b/3', 'c#/4', 'd/4', 'e/4', 'f#/4'],
    'harm. minor': ['f#/3', 'g#/3', 'a/3', 'b/3', 'c#/4', 'd/4', 'e#/4', 'f#/4']
  },
  'Gb': {
    'major': ['gb/3', 'ab/3', 'bb/3', 'cb/4', 'db/4', 'eb/4', 'f/4', 'gb/4' ],
    'nat. minor': null
  },
  'G': {
    'major': ['g/3', 'a/3', 'b/3', 'c/4', 'd/4', 'e/4', 'f#/4', 'g/4'],
    'nat. minor': ['g/3', 'a/3', 'bb/3', 'c/4', 'd/4', 'eb/4', 'f/4', 'g/4'],
    'harm. minor': ['g/3', 'a/3', 'bb/3', 'c/4', 'd/4', 'eb/4', 'f#/4', 'g/4']
  },
  'G#': {
    'major': null,
    'nat. minor': ['g#/3', 'a#/3', 'b/3', 'c#/4', 'd#/4', 'e/4', 'f#/4', 'g#/4'],
    'harm. minor': ['g#/3', 'a#/3', 'b/3', 'c#/4', 'd#/4', 'e/4', 'fx/4', 'g#/4']
  },
}

const countAccidentals = (key, scaleType) => {
  const scaleTypeKey = scaleType.includes("minor") ? 'nat. minor' : 'major'
  const notes = keyNotesObj[key][scaleTypeKey]
  let accidentals = 0
  notes.forEach(note => {
    if (note[1] === '#' || note[1] === 'b') accidentals++
  })
  // if (scaleType === 'harm. minor') accidentals -= 1
  return accidentals
}

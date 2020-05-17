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

function instrumentReducer(state = 'Guitar', action) {
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
      return action.key

    default:
      return state;
  }
}

function scaleTypeReducer(state = 'major', action){
  switch(action.type) {
    case 'SET_KEY':
      return action.scaleType

    default:
      return state;
  }
}

function scaleShapeReducer(state = 'Ascending and Descending', action){
  switch(action.type) {
    case 'SET_SCALE_SHAPE_AND_REPETITION':
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
      const notes = keyNotesObj[action.key][action.scaleType]
      const sharps = notes.filter(note => note[1] === '#')
      const flats = notes.filter(note => note[1] === 'b')
      return sharps.length > 0 ? 'sharps' : (flats.length > 0 ? 'flats' : 'sharps')

    default:
      return state;
  }
}


function keyNotesReducer(state=['c/4', 'c#/4', 'd/4', 'd#/4', 'e/4', 'f/4',
                                'f#/4', 'g/4', 'g#/4', 'a/4', 'a#/4', 'b/4', 'c/5' ], action){
  switch(action.type) {
    case 'SET_KEY':
      debugger
      return keyNotesObj[action.key]
    //  return keyNotesObj[action.key][action.scaleType]

    default:
      return state;
  }
}

function accidentalsReducer(state=0, action){
  switch(action.type) {
    case 'SET_KEY':
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

function scaleReducer(state=[0, 2, 4, 5, 7, 9, 11, 12], action){
  switch(action.type) {
    case 'SET_KEY':
      return scaleGenerator[action.scaleType]

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

const scaleGenerator = {
  'major': [0, 2, 4, 5, 7, 9, 11, 12],
  'nat. minor': [0, 2, 3, 5, 7, 9, 10, 12],
  'harm. minor': [0, 2, 3, 5, 7, 9, 11, 12]
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
  'C': {
    'major': 'sharps',
    'minor': 'flats'
  },
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

const allSharpNotes = [
  'c/2', 'c#/2', 'd/2', 'd#/2', 'e/2', 'f/2', 'f#/2', 'g/2', 'g#/2', 'a/2', 'a#/2', 'b/2',
  'c/3', 'c#/3', 'd/3', 'd#/3', 'e/3', 'f/3', 'f#/3', 'g/3', 'g#/3', 'a/3', 'a#/3', 'b/3',
  'c/4', 'c#/4', 'd/4', 'd#/4', 'e/4', 'f/4', 'f#/4', 'g/4', 'g#/4', 'a/4', 'a#/4', 'b/4',
  'c/5', 'c#/5', 'd/5', 'd#/5', 'e/5', 'f/5', 'f#/5', 'g/5', 'g#/5', 'a/5', 'a#/5', 'b/5',
  'c/6', 'c#/6', 'd/6', 'd#/6', 'e/6', 'f/6', 'f#/6', 'g/6', 'g#/6', 'a/6', 'a#/6', 'b/6'
]

const allFlatNotes = [
  'c/2', 'db/2', 'd/2', 'eb/2', 'e/2', 'f/2', 'gb/2', 'g/2', 'ab/2', 'a/2', 'bb/2', 'b/2',
  'c/3', 'db/3', 'd/3', 'eb/3', 'e/3', 'f/3', 'gb/3', 'g/3', 'ab/3', 'a/3', 'bb/3', 'b/3',
  'c/4', 'db/4', 'd/4', 'eb/4', 'e/4', 'f/4', 'gb/4', 'g/4', 'ab/4', 'a/4', 'bb/4', 'b/4',
  'c/5', 'db/5', 'd/5', 'eb/5', 'e/5', 'f/5', 'gb/5', 'g/5', 'ab/5', 'a/5', 'bb/5', 'b/5',
  'c/6', 'db/6', 'd/6', 'eb/6', 'e/6', 'f/6', 'gb/6', 'g/6', 'ab/6', 'a/6', 'bb/6', 'b/6'
]

const keyNotesObj = {
  'Ab': allFlatNotes.slice(20, 33),
  'A': allSharpNotes.slice(21, 34),
  'A#': allSharpNotes.slice(22, 35),
  'Bb': allFlatNotes.slice(22, 35),
  'B': allSharpNotes.slice(23, 36),
  'Cb': allFlatNotes.slice(23, 36),
  'C': allSharpNotes.slice(24, 37),
  'C#': allSharpNotes.slice(25, 38),
  'Db': allFlatNotes.slice(25, 38),
  'D': allSharpNotes.slice(26, 39),
  'D#': allSharpNotes.slice(27, 40),
  'Eb': allFlatNotes.slice(27, 40),
  'E': allSharpNotes.slice(28, 41),
  'F': allFlatNotes.slice(29, 42),
  'F#': allSharpNotes.slice(30, 43),
  'Gb': allFlatNotes.slice(30, 43),
  'G': allSharpNotes.slice(41, 44),
  'G#': allSharpNotes.slice(42, 45)
}

// const keyNotesObj = {
//   'Ab': {
//     'major': ['ab/3', 'bb/3', 'c/4', 'db/4', 'eb/4', 'f/4', 'g/4', 'ab/4'],
//     'nat. minor': ['ab/3', 'bb/3', 'cb/4', 'db/4', 'eb/4', 'fb/4', 'gb/4', 'ab/4'],
//     'harm. minor': ['ab/3', 'bb/3', 'cb/4', 'db/4', 'eb/4', 'fb/4', 'g/4', 'ab/4']
//   },
//   'A': {
//     'major': ['a/3', 'b/3', 'c#/4', 'd/4', 'e/4', 'f#/4', 'g#/4', 'a/4'],
//     'nat. minor': ['a/3', 'b/3', 'c/4', 'd/4', 'e/4', 'f/4', 'g/4', 'a/4'],
//     'harm. minor': ['a/3', 'b/3', 'c/4', 'd/4', 'e/4', 'f/4', 'g#/4', 'a/4']
//   },
//   'A#': {
//     'major': null,
//     'nat. minor': ['a#/3', 'b#/3', 'c#/4', 'd#/4', 'e#/4', 'f#/4', 'g#/4', 'a#/4'],
//     'harm. minor': ['a#/3', 'b#/3', 'c#/4', 'd#/4', 'e#/4', 'f#/4', 'gx/4', 'a#/4']
//   },
//   'Bb': {
//     'major': ['bb/3', 'c/4', 'd/4', 'eb/4', 'f/4', 'g/4', 'a/4', 'bb/4'],
//     'nat. minor': ['bb/3', 'c/4', 'db/4', 'eb/4', 'f/4', 'gb/4', 'ab/4', 'bb/4'],
//     'harm. minor': ['bb/3', 'c/4', 'db/4', 'eb/4', 'f/4', 'gb/4', 'a/4', 'bb/4']
//   },
//   'B': {
//     'major': ['b/3', 'c#/4', 'd#/4', 'e/4', 'f#/4', 'g#/4', 'a#/4', 'b/4'],
//     'nat. minor': ['b/3', 'c#/4', 'd/4', 'e/4', 'f#/4', 'g/4', 'a/4', 'b/4'],
//     'harm. minor': ['b/3', 'c#/4', 'd/4', 'e/4', 'f#/4', 'g/4', 'a#/4', 'b/4']
//   },
//   'Cb': {
//     'major': ['cb/4', 'db/4', 'eb/4', 'fb/4', 'gb/4', 'ab/4', 'bb/4', 'cb/5' ],
//     'nat. minor': null
//   },
//   'C': {
//     'major': ['c/4', 'd/4', 'e/4', 'f/4', 'g/4', 'a/4', 'b/4', 'c/5'],
//     'nat. minor': ['c/4', 'd/4', 'eb/4', 'f/4', 'g/4', 'ab/4', 'bb/4', 'c/5'],
//     'harm. minor': ['c/4', 'd/4', 'eb/4', 'f/4', 'g/4', 'ab/4', 'b/4', 'c/5']
//   },
//   'C#': {
//     'major': ['c#/4', 'd#/4', 'e#/4', 'f#/4', 'g#/4', 'a#/4', 'b#/4', 'c#/5' ],
//     'nat. minor': ['c#/4', 'd#/4', 'e/4', 'f#/4', 'g#/4', 'a/4', 'b/4', 'c#/5' ],
//     'harm. minor': ['c#/4', 'd#/4', 'e/4', 'f#/4', 'g#/4', 'a/4', 'b#/4', 'c#/5' ]
//   },
//   'Db': {
//     'major': ['db/4', 'eb/4', 'f/4', 'gb/4', 'ab/4', 'bb/4', 'c/5', 'db/5' ],
//     'nat. minor': null
//   },
//   'D': {
//     'major': ['d/4', 'e/4', 'f#/4', 'g/4', 'a/4', 'b/4', 'c#/5', 'd/5'],
//     'nat. minor': ['d/4', 'e/4', 'f/4', 'g/4', 'a/4', 'bb/4', 'c/5', 'd/5'],
//     'harm. minor': ['d/4', 'e/4', 'f/4', 'g/4', 'a/4', 'bb/4', 'c#/5', 'd/5']
//   },
//   'D#': {
//     'major': null,
//     'nat. minor': ['d#/4', 'e#/4', 'f#/4', 'g#/4', 'a#/4', 'b/4', 'c#/5', 'd#/5'],
//     'harm. minor': ['d#/4', 'e#/4', 'f#/4', 'g#/4', 'a#/4', 'b/4', 'cx/5', 'd#/5']
//   },
//   'Eb': {
//     'major': ['eb/4', 'f/4', 'g/4', 'ab/4', 'bb/4', 'c/5', 'd/5', 'eb/5'],
//     'nat. minor': ['eb/4', 'f/4', 'gb/4', 'ab/4', 'bb/4', 'cb/5', 'db/5', 'eb/5'],
//     'harm. minor': ['eb/4', 'f/4', 'gb/4', 'ab/4', 'bb/4', 'cb/5', 'd/5', 'eb/5']
//   },
//   'E': {
//     'major': ['e/3', 'f#/3', 'g#/3', 'a/3', 'b/3', 'c#/4', 'd#/4', 'e/4'],
//     'nat. minor': ['e/3', 'f#/3', 'g/3', 'a/3', 'b/3', 'c/4', 'd/4', 'e/4'],
//     'harm. minor': ['e/3', 'f#/3', 'g/3', 'a/3', 'b/3', 'c/4', 'd#/4', 'e/4']
//   },
//   'F': {
//     'major': ['f/3', 'g/3', 'a/3', 'bb/3', 'c/4', 'd/4', 'e/4', 'f/4'],
//     'nat. minor': ['f/3', 'g/3', 'ab/3', 'bb/3', 'c/4', 'db/4', 'eb/4', 'f/4'],
//     'harm. minor': ['f/3', 'g/3', 'ab/3', 'bb/3', 'c/4', 'db/4', 'e/4', 'f/4']
//   },
//   'F#': {
//     'major': ['f#/3', 'g#/3', 'a#/3', 'b/3', 'c#/4', 'd#/4', 'e#/4', 'f#/4'],
//     'nat. minor': ['f#/3', 'g#/3', 'a/3', 'b/3', 'c#/4', 'd/4', 'e/4', 'f#/4'],
//     'harm. minor': ['f#/3', 'g#/3', 'a/3', 'b/3', 'c#/4', 'd/4', 'e#/4', 'f#/4']
//   },
//   'Gb': {
//     'major': ['gb/3', 'ab/3', 'bb/3', 'cb/4', 'db/4', 'eb/4', 'f/4', 'gb/4' ],
//     'nat. minor': null
//   },
//   'G': {
//     'major': ['g/3', 'a/3', 'b/3', 'c/4', 'd/4', 'e/4', 'f#/4', 'g/4'],
//     'nat. minor': ['g/3', 'a/3', 'bb/3', 'c/4', 'd/4', 'eb/4', 'f/4', 'g/4'],
//     'harm. minor': ['g/3', 'a/3', 'bb/3', 'c/4', 'd/4', 'eb/4', 'f#/4', 'g/4']
//   },
//   'G#': {
//     'major': null,
//     'nat. minor': ['g#/3', 'a#/3', 'b/3', 'c#/4', 'd#/4', 'e/4', 'f#/4', 'g#/4'],
//     'harm. minor': ['g#/3', 'a#/3', 'b/3', 'c#/4', 'd#/4', 'e/4', 'fx/4', 'g#/4']
//   },
// }

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

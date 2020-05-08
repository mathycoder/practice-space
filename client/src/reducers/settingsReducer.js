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

function categoryReducer(state = 'sharps', action) {
  switch(action.type) {
    case 'SET_KEY':
    // ['d/4', 'e/4', 'f#/4', 'g/4', 'a/4', 'b/4', 'c#/5', 'd/5' ]
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
      return keyNotesObj[action.key][action.scaleType]

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

function accidentalsReducer(state=0, action){
  switch(action.type) {
    case 'SET_KEY':
      return countAccidentals(action.key, action.scaleType)


    default:
      return state;
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
  'C': {
    'major': ['c/4', 'd/4', 'e/4', 'f/4', 'g/4', 'a/4', 'b/4', 'c/5' ],
    'nat. minor': ['c/4', 'd/4', 'eb/4', 'f/4', 'g/4', 'ab/4', 'bb/4', 'c/5' ]
  },
  'F': {
    'major': ['f/3', 'g/3', 'a/3', 'bb/3', 'c/4', 'd/4', 'e/4', 'f/4' ]
  },
  'G': {
    'major': ['g/3', 'a/3', 'b/3', 'c/4', 'd/4', 'e/4', 'f#/4', 'g/4' ]
  },
  'D': {
    'major': ['d/4', 'e/4', 'f#/4', 'g/4', 'a/4', 'b/4', 'c#/5', 'd/5' ]
  },
  'A': {
    'major': ['a/3', 'b/3', 'c#/4', 'd/4', 'e/4', 'f#/4', 'g#/4', 'a/4' ]
  },
  'E': {
    'major': ['e/3', 'f#/3', 'g#/3', 'a/3', 'b/3', 'c#/4', 'd#/4', 'e/4' ]
  },
  'B': {
    'major': ['b/3', 'c#/4', 'd#/4', 'e/4', 'f#/4', 'g#/4', 'a#/4', 'b/4' ]
  },
  'Bb': {
    'major': ['bb/3', 'c/4', 'd/4', 'eb/4', 'f/4', 'g/4', 'a/4', 'bb/4' ]
  },
  'Eb': {
    'major': ['eb/4', 'f/4', 'g/4', 'ab/4', 'bb/4', 'c/5', 'd/5', 'eb/5' ]
  },
  'Ab': {
    'major': ['ab/3', 'bb/3', 'c/4', 'db/4', 'eb/4', 'f/4', 'g/4', 'ab/4' ]
  },
  'Db': {
    'major': ['db/4', 'eb/4', 'f/4', 'gb/4', 'ab/4', 'bb/4', 'c/5', 'db/5' ]
  },
  'F#': {
    'major': ['f#/3', 'g#/3', 'a#/3', 'b/3', 'c#/4', 'd#/4', 'e#/4', 'f#/4']
  },
  'C#': {
    'major': ['c#/4', 'd#/4', 'e#/4', 'f#/4', 'g#/4', 'a#/4', 'b#/4', 'c#/5' ]
  },
  'Gb': {
    'major': ['gb/3', 'ab/3', 'bb/3', 'cb/4', 'db/4', 'eb/4', 'f/4', 'gb/4' ]
  },
  'Cb': {
    'major': ['cb/4', 'db/4', 'eb/4', 'fb/4', 'gb/4', 'ab/4', 'bb/4', 'cb/5' ]
  },
}

const countAccidentals = (key, scaleType) => {
  const notes = keyNotesObj[key][scaleType]
  let accidentals = 0
  notes.forEach(note => {
    if (note[1] === '#' || note[1] === 'b') accidentals++
  })
  return accidentals
}

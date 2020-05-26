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

function scaleShapeReducer(state = 'Up and Down', action){
  switch(action.type) {
    case 'SET_KEY':
      return action.scaleShape

    default:
      return state;
  }
}

function scaleRepetitionReducer(state = "None", action){
  switch(action.type) {
    case 'SET_KEY':
      return action.scaleRepetition

    default:
      return state;
  }
}

function categoryReducer(state = 'sharps', action) {
  switch(action.type) {
    case 'SET_KEY':
      let keyType = action.scaleType
      if (keyType.includes('minor')) keyType = 'minor'
      const keyInfo = countAccidentals[action.key][keyType]
      return keyInfo.includes("sharp") ? 'sharps' : 'flats'

    default:
      return state;
  }
}


function keyNotesReducer(state=['c/4', 'c#/4', 'd/4', 'd#/4', 'e/4', 'f/4',
                                'f#/4', 'g/4', 'g#/4', 'a/4', 'a#/4', 'b/4', 'c/5' ], action){
  switch(action.type) {
    case 'SET_KEY':
      let keyType = action.scaleType
      if (keyType.includes('minor')) keyType = 'minor'
      return keyNotesObj[action.key][keyType]
    //  return keyNotesObj[action.key][action.scaleType]

    default:
      return state;
  }
}

function accidentalsReducer(state=0, action){
  switch(action.type) {
    case 'SET_KEY':
      let keyType = action.scaleType
      if (keyType.includes('minor')) keyType = 'minor'
      const keyInfo = countAccidentals[action.key][keyType]
      return keyInfo[0]

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

function scaleReducer(state=[0,2,4,5,7,9,11,12,11,9,7,5,4,2], action){
  switch(action.type) {
    case 'SET_KEY':
      return scaleGenerator[action.scaleType][action.scaleShape][action.scaleRepetition]

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
  'major': {
    "Up and Down": {
      "None": [0,2,4,5,7,9,11,12,11,9,7,5,4,2],
      "Top and Bottom": [0,2,4,5,7,9,11,12,12,11,9,7,5,4,2,0],
      "All 2x": [0,0,2,2,4,4,5,5,7,7,9,9,11,11,12,12,11,11,9,9,7,7,5,5,4,4,2,2],
      "All 3x": [0,0,0,2,2,2,4,4,4,5,5,5,7,7,7,9,9,9,11,11,11,12,12,12,11,11,11,9,9,9,7,7,7,5,5,5,4,4,4,2,2,2],
      "All 4x": [0,0,0,0,2,2,2,2,4,4,4,4,5,5,5,5,7,7,7,7,9,9,9,9,11,11,11,11,12,12,12,12,11,11,11,11,9,9,9,9,7,7,7,7,5,5,5,5,4,4,4,4,2,2,2,2],
    },
    "Up Only": {
      "None": [0,2,4,5,7,9,11,12],
      "Top and Bottom": [0,2,4,5,7,9,11,12],
      "All 2x": [0,0,2,2,4,4,5,5,7,7,9,9,11,11,12,12],
      "All 3x": [0,0,0,2,2,2,4,4,4,5,5,5,7,7,7,9,9,9,11,11,11,12,12,12],
      "All 4x": [0,0,0,0,2,2,2,2,4,4,4,4,5,5,5,5,7,7,7,7,9,9,9,9,11,11,11,11,12,12,12,12],
    },
    "Down Only": {
      "None": [0,2,4,5,7,9,11,12].reverse(),
      "Top and Bottom": [0,2,4,5,7,9,11,12].reverse(),
      "All 2x": [0,0,2,2,4,4,5,5,7,7,9,9,11,11,12,12].reverse(),
      "All 3x": [0,0,0,2,2,2,4,4,4,5,5,5,7,7,7,9,9,9,11,11,11,12,12,12].reverse(),
      "All 4x": [0,0,0,0,2,2,2,2,4,4,4,4,5,5,5,5,7,7,7,7,9,9,9,9,11,11,11,11,12,12,12,12].reverse(),
    }
  },
  'chromatic': {
    "Up and Down": {
      "None": [0,1,2,3,4,5,6,7,8,9,10,11,12,11,10,9,8,7,6,5,4,3,2,1],
      "Top and Bottom": [0,1,2,3,4,5,6,7,8,9,10,11,12,12,11,10,9,8,7,6,5,4,3,2,1,0],
      "All 2x": [0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,11,11,10,10,9,9,8,8,7,7,6,6,5,5,4,4,3,3,2,2,1,1],
      "All 3x": [0,0,0,1,1,1,2,2,2,3,3,3,4,4,4,5,5,5,6,6,6,7,7,7,8,8,8,9,9,9,10,10,10,11,11,11,12,12,12,11,11,11,10,10,10,9,9,9,8,8,8,7,7,7,6,6,6,5,5,5,4,4,4,3,3,3,2,2,2,1,1,1],
      "All 4x": [0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,6,6,6,6,7,7,7,7,8,8,8,8,9,9,9,9,10,10,10,10,11,11,11,11,12,12,12,12,11,11,11,11,10,10,10,10,9,9,9,9,8,8,8,8,7,7,7,7,6,6,6,6,5,5,5,5,4,4,4,4,3,3,3,3,2,2,2,2,1,1,1,1]
    },
    "Up Only": {
      "None": [0,1,2,3,4,5,6,7,8,9,10,11,12],
      "Top and Bottom": [0,1,2,3,4,5,6,7,8,9,10,11,12],
      "All 2x": [0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12],
      "All 3x": [0,0,0,1,1,1,2,2,2,3,3,3,4,4,4,5,5,5,6,6,6,7,7,7,8,8,8,9,9,9,10,10,10,11,11,11,12,12,12],
      "All 4x": [0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,6,6,6,6,7,7,7,7,8,8,8,8,9,9,9,9,10,10,10,10,11,11,11,11,12,12,12,12]
    },
    "Down Only": {
      "None": [0,1,2,3,4,5,6,7,8,9,10,11,12].reverse(),
      "Top and Bottom": [0,1,2,3,4,5,6,7,8,9,10,11,12].reverse(),
      "All 2x": [0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12].reverse(),
      "All 3x": [0,0,0,1,1,1,2,2,2,3,3,3,4,4,4,5,5,5,6,6,6,7,7,7,8,8,8,9,9,9,10,10,10,11,11,11,12,12,12].reverse(),
      "All 4x": [0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,6,6,6,6,7,7,7,7,8,8,8,8,9,9,9,9,10,10,10,10,11,11,11,11,12,12,12,12].reverse()
    }
  },
  'nat. minor': {
    "Up and Down": {
      "None": [0,2,3,5,7,8,10,12,10,8,7,5,3,2],
      "Top and Bottom": [0,2,3,5,7,8,10,12,12,10,8,7,5,3,2,0],
      "All 2x": [0,0,2,2,3,3,5,5,7,7,8,8,10,10,12,12,10,10,8,8,7,7,5,5,3,3,2,2],
      "All 3x": [0,0,0,2,2,2,3,3,3,5,5,5,7,7,7,8,8,8,10,10,10,12,12,12,10,10,10,8,8,8,7,7,7,5,5,5,3,3,3,2,2,2],
      "All 4x": [0,0,0,0,2,2,2,2,3,3,3,3,5,5,5,5,7,7,7,7,8,8,8,8,10,10,10,10,12,12,12,12,10,10,10,10,8,8,8,8,7,7,7,7,5,5,5,5,3,3,3,3,2,2,2,2],
    },
    "Up Only": {
      "None": [0,2,3,5,7,8,10,12],
      "Top and Bottom": [0,2,3,5,7,8,10,12],
      "All 2x": [0,0,2,2,3,3,5,5,7,7,8,8,10,10,12,12],
      "All 3x": [0,0,0,2,2,2,3,3,3,5,5,5,7,7,7,8,8,8,10,10,10,12,12,12],
      "All 4x": [0,0,0,0,2,2,2,2,3,3,3,3,5,5,5,5,7,7,7,7,8,8,8,8,10,10,10,10,12,12,12,12],
    },
    "Down Only": {
      "None": [0,2,3,5,7,8,10,12].reverse(),
      "Top and Bottom": [0,2,3,5,7,8,10,12].reverse(),
      "All 2x": [0,0,2,2,3,3,5,5,7,7,8,8,10,10,12,12].reverse(),
      "All 3x": [0,0,0,2,2,2,3,3,3,5,5,5,7,7,7,8,8,8,10,10,10,12,12,12].reverse(),
      "All 4x": [0,0,0,0,2,2,2,2,3,3,3,3,5,5,5,5,7,7,7,7,8,8,8,8,10,10,10,10,12,12,12,12].reverse(),
    }
  },
  'harm. minor': {
    "Up and Down": {
      "None": [0,2,3,5,7,8,11,12,11,8,7,5,3,2],
      "Top and Bottom": [0,2,3,5,7,8,11,12,12,11,8,7,5,3,2,0],
      "All 2x": [0,0,2,2,3,3,5,5,7,7,8,8,11,11,12,12,11,11,8,8,7,7,5,5,3,3,2,2],
      "All 3x": [0,0,0,2,2,2,3,3,3,5,5,5,7,7,7,8,8,8,11,11,11,12,12,12,11,11,11,8,8,8,7,7,7,5,5,5,3,3,3,2,2,2],
      "All 4x": [0,0,0,0,2,2,2,2,3,3,3,3,5,5,5,5,7,7,7,7,8,8,8,8,11,11,11,11,12,12,12,12,11,11,11,11,8,8,8,8,7,7,7,7,5,5,5,5,3,3,3,3,2,2,2,2],
    },
    "Up Only": {
      "None": [0,2,3,5,7,8,11,12],
      "Top and Bottom": [0,2,3,5,7,8,11,12],
      "All 2x": [0,0,2,2,3,3,5,5,7,7,8,8,11,11,12,12],
      "All 3x": [0,0,0,2,2,2,3,3,3,5,5,5,7,7,7,8,8,8,11,11,11,12,12,12],
      "All 4x": [0,0,0,0,2,2,2,2,3,3,3,3,5,5,5,5,7,7,7,7,8,8,8,8,11,11,11,11,12,12,12,12],
    },
    "Down Only": {
      "None": [0,2,3,5,7,8,11,12].reverse(),
      "Top and Bottom": [0,2,3,5,7,8,11,12].reverse(),
      "All 2x": [0,0,2,2,3,3,5,5,7,7,8,8,11,11,12,12].reverse(),
      "All 3x": [0,0,0,2,2,2,3,3,3,5,5,5,7,7,7,8,8,8,11,11,11,12,12,12].reverse(),
      "All 4x": [0,0,0,0,2,2,2,2,3,3,3,3,5,5,5,5,7,7,7,7,8,8,8,8,11,11,11,11,12,12,12,12].reverse(),
    }
  }
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
  'Ab': {
    'chromatic': allSharpNotes.slice(20, 33),
    'major': ['ab/3', 'a/3', 'bb/3', 'b/3', 'c/4', 'db/4', 'd/4', 'eb/4', 'e/4', 'f/4', 'gb/4', 'g/4', 'ab/4'],
    'minor': ['ab/3', 'a/3', 'bb/3', 'cb/4', 'c/4', 'db/4', 'd/4', 'eb/4', 'fb/4', 'f/4', 'gb/4', 'g/4', 'ab/4']
  },
  'A': {
    'chromatic': allSharpNotes.slice(21, 34),
    'major': ['a/3', 'a#/3', 'b/3', 'c/4', 'c#/4', 'd/4', 'd#/4', 'e/4', 'f/4', 'f#/4', 'g/4', 'g#/4', 'a/4'],
    'minor': ['a/3', 'a#/3', 'b/3', 'c/4', 'c#/4', 'd/4', 'd#/4', 'e/4', 'f/4', 'f#/4', 'g/4', 'g#/4', 'a/4']
  },
  'A#': {
    'chromatic': allSharpNotes.slice(22, 35),
    'major': null,
    'minor': ['a#/3', 'b/3', 'b#/3', 'c#/4', 'd/4', 'd#/4', 'e/4', 'e#/4', 'f#/4', 'g/4', 'g#/4', 'gx/4', 'a#/4']
  },
  'Bb': {
    'chromatic': allSharpNotes.slice(22, 35),
    'major': ['bb/3', 'b/3', 'c/4', 'db/4', 'd/4', 'eb/4', 'e/4', 'f/4', 'gb/4', 'g/4', 'ab/4', 'a/4', 'bb/4'],
    'minor': ['bb/3', 'b/3', 'c/4', 'db/4', 'd/4', 'eb/4', 'e/4', 'f/4', 'gb/4', 'g/4', 'ab/4', 'a/4', 'bb/4'],
  },
  'B': {
    'chromatic': allSharpNotes.slice(23, 36),
    'major': ['b/3', 'c/4', 'c#/4', 'd/4', 'd#/4', 'e/4', 'f/4', 'f#/4', 'g/4', 'g#/4', 'a/4', 'a#/4', 'b/4'],
    'minor': ['b/3', 'c/4', 'c#/4', 'd/4', 'd#/4', 'e/4', 'f/4', 'f#/4', 'g/4', 'g#/4', 'a/4', 'a#/4', 'b/4'],
  },
  'Cb': {
    'chromatic': allSharpNotes.slice(23, 36),
    'major': ['cb/4', 'c/4', 'db/4', 'd/4', 'eb/4', 'fb/4', 'f/4', 'gb/4', 'g/4', 'ab/4', 'a/4', 'bb/4', 'cb/5' ],
    'minor': null
  },
  'C': {
    'chromatic': allSharpNotes.slice(24, 37),
    'major': ['c/4', 'c#/4', 'd/4', 'd#/4', 'e/4', 'f/4', 'f#/4', 'g/4', 'g#/4', 'a/4', 'a#/4', 'b/4', 'c/5'],
    'minor': ['c/4', 'db/4', 'd/4', 'eb/4', 'e/4', 'f/4', 'gb/4', 'g/4', 'ab/4', 'a/4', 'bb/4', 'b/4', 'c/5']
  },
  'C#': {
    'chromatic': allSharpNotes.slice(25, 38),
    'major': ['c#/4', 'd/4', 'd#/4', 'e/4', 'e#/4', 'f#/4', 'g/4', 'g#/4', 'a/4', 'a#/4', 'b/4', 'b#/4', 'c#/5' ],
    'minor': ['c#/4', 'd/4', 'd#/4', 'e/4', 'e#/4', 'f#/4', 'g/4', 'g#/4', 'a/4', 'a#/4', 'b/4', 'b#/4', 'c#/5' ],
  },
  'Db': {
    'chromatic': allSharpNotes.slice(25, 38),
    'major': ['db/4', 'd/4', 'eb/4', 'e/4', 'f/4', 'gb/4', 'g/4', 'ab/4', 'a/4', 'bb/4', 'b/4', 'c/5', 'db/5' ],
    'minor': null
  },
  'D': {
    'chromatic': allSharpNotes.slice(26, 39),
    'major': ['d/4', 'd#/4', 'e/4', 'f/4', 'f#/4', 'g/4', 'g#/4', 'a/4', 'a#/4', 'b/4', 'c/4', 'c#/5', 'd/5'],
    'minor': ['d/4', 'eb/4', 'e/4', 'f/4', 'gb/4', 'g/4', 'ab/4', 'a/4', 'bb/4', 'b/4', 'c/5', 'c#/5', 'd/5'],
  },
  'D#': {
    'chromatic': allSharpNotes.slice(27, 40),
    'major': null,
    'minor': ['d#/4', 'e/4', 'e#/4', 'f#/4', 'g/4', 'g#/4', 'a/4', 'a#/4', 'b/4', 'c/5', 'c#/5', 'cx/5', 'd#/5']
  },
  'Eb': {
    'chromatic': allSharpNotes.slice(27, 40),
    'major': ['eb/4', 'e/4', 'f/4', 'gb/4', 'g/4', 'ab/4', 'a/4', 'bb/4', 'b/4', 'c/5', 'db/5', 'd/5', 'eb/5'],
    'minor': ['eb/4', 'e/4', 'f/4', 'gb/4', 'g/4', 'ab/4', 'a/4', 'bb/4', 'cb/5', 'c/5', 'db/5', 'd/5', 'eb/5']
  },
  'E': {
    'chromatic': allSharpNotes.slice(28, 41),
    'major': ['e/3', 'f/3', 'f#/3', 'g/3', 'g#/3', 'a/3', 'a#/3', 'b/3', 'c/3', 'c#/4', 'd/4', 'd#/4', 'e/4'],
    'minor': ['e/3', 'f/3', 'f#/3', 'g/3', 'g#/3', 'a/3', 'a#/3', 'b/3', 'c/3', 'c#/4', 'd/4', 'd#/4', 'e/4']
  },
  'F': {
    'chromatic': allSharpNotes.slice(29, 42),
    'major': ['f/3', 'gb/3', 'g/3', 'ab/3', 'a/3', 'bb/3', 'b/3', 'c/4', 'db/4', 'd/4', 'eb/4', 'e/4', 'f/4'],
    'minor': ['f/3', 'gb/3', 'g/3', 'ab/3', 'a/3', 'bb/3', 'b/3', 'c/4', 'db/4', 'd/4', 'eb/4', 'e/4', 'f/4']
  },
  'F#': {
    'chromatic': allSharpNotes.slice(30, 43),
    'major': ['f#/3', 'g/3', 'g#/3', 'a/3', 'a#/3', 'b/3', 'c/4', 'c#/4', 'd/4', 'd#/4', 'e/4', 'e#/4', 'f#/4'],
    'minor': ['f#/3', 'g/3', 'g#/3', 'a/3', 'a#/3', 'b/3', 'c/4', 'c#/4', 'd/4', 'd#/4', 'e/4', 'e#/4', 'f#/4'],
  },
  'Gb': {
    'chromatic': allSharpNotes.slice(30, 43),
    'major': ['gb/3', 'g/3', 'ab/3', 'a/3', 'bb/3', 'cb/4', 'c/4', 'db/4', 'd/4', 'eb/4', 'e/4', 'f/4', 'gb/4' ],
    'minor': null
  },
  'G': {
    'chromatic': allSharpNotes.slice(41, 44),
    'major': ['g/3', 'g#/3', 'a/3', 'a#/3', 'b/3', 'c/4', 'c#/4', 'd/4', 'd#/4', 'e/4', 'f/4', 'f#/4', 'g/4'],
    'minor': ['g/3', 'ab/3', 'a/3', 'bb/3', 'b/3', 'c/4', 'db/4', 'd/4', 'eb/4', 'e/4', 'f/4', 'f#/4', 'g/4']
  },
  'G#': {
    'chromatic': allSharpNotes.slice(42, 45),
    'major': null,
    'minor': ['g#/3', 'a/3', 'a#/3', 'b/3', 'c/4', 'c#/4', 'd/4', 'd#/4', 'e/4', 'f/4', 'f#/4', 'g/4', 'g#/4']
  },
}

const countAccidentals = {
  'Ab': {
    'major': '4 flats',
    'minor': '7 flats',
    'chromatic': '0 flats'
  },
  'A': {
    'major': '3 sharps',
    'minor': '0 sharps',
    'chromatic': '0 sharps'
  },
  'A#': {
    'major': null,
    'minor': '7 sharps',
    'chromatic': '0 sharps'
  },
  'Bb': {
    'major': '2 flats',
    'minor': '5 flats',
    'chromatic': '0 flats'
  },
  'B': {
    'major': '5 sharps',
    'minor': '2 sharps',
    'chromatic': '0 sharps'
  },
  'Cb': {
    'major':  '7 flats',
    'minor': null,
    'chromatic': '0 flats'
  },
  'C': {
    'major':  '0 sharps',
    'minor':  '3 flats',
    'chromatic': '0 sharps'
  },
  'C#': {
    'major':  '7 sharps',
    'minor':  '4 sharps',
    'chromatic': '0 sharps'
  },
  'Db': {
    'major':  '5 flats',
    'minor':  null,
    'chromatic': '0 flats'
  },
  'D': {
    'major':  '2 sharps',
    'minor':  '1 flat',
    'chromatic': '0 sharps'
  },
  'D#': {
    'major':  null,
    'minor':  '6 sharps',
    'chromatic': '0 sharps'
  },
  'Eb': {
    'major':  '3 flats',
    'minor':  '6 flats',
    'chromatic': '0 flats'
  },
  'E': {
    'major':  '4 sharps',
    'minor':  '1 sharp',
    'chromatic': '0 sharps'
  },
  'F': {
    'major':  '1 flat',
    'minor':  '4 flats',
    'chromatic': '0 sharps'
  },
  'F#': {
    'major':  '6 sharps',
    'minor':  '3 sharps',
    'chromatic': '0 sharps'
  },
  'Gb': {
    'major':  '6 flats',
    'minor':  null,
    'chromatic': '0 flats'
  },
  'G': {
    'major':  '1 sharps',
    'minor':  '2 flats',
    'chromatic': '0 sharps'
  },
  'G#': {
    'major':  null,
    'minor':  '5 sharps',
    'chromatic': '0 sharps'
  }
}

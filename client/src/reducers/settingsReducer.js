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
      const keyType = action.scaleType.includes('minor') ? 'minor' : 'major'
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
      const keyType = action.scaleType.includes('minor') ? 'minor' : 'major'
      return keyNotesObj[action.key][keyType]
    //  return keyNotesObj[action.key][action.scaleType]

    default:
      return state;
  }
}

function accidentalsReducer(state=0, action){
  switch(action.type) {
    case 'SET_KEY':
      const keyType = action.scaleType.includes('minor') ? 'minor' : 'major'
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
    "Ascending and Descending": {
      "None": [0,2,4,5,7,9,11,12,11,9,7,5,4,2],
      "Top and Bottom": [0,2,4,5,7,9,11,12,12,11,9,7,5,4,2,0],
      "All 2x": [0,0,2,2,4,4,5,5,7,7,9,9,11,11,12,12,11,11,9,9,7,7,5,5,4,4,2,2],
      "All 3x": [0,0,0,2,2,2,4,4,4,5,5,5,7,7,7,9,9,9,11,11,11,12,12,12,11,11,11,9,9,9,7,7,7,5,5,5,4,4,4,2,2,2],
      "All 4x": [0,0,0,0,2,2,2,2,4,4,4,4,5,5,5,5,7,7,7,7,9,9,9,9,11,11,11,11,12,12,12,12,11,11,11,11,9,9,9,9,7,7,7,7,5,5,5,5,4,4,4,4,2,2,2,2],
    },
    "Ascending": {
      "None": [0,2,4,5,7,9,11,12],
      "Top and Bottom": [0,2,4,5,7,9,11,12],
      "All 2x": [0,0,2,2,4,4,5,5,7,7,9,9,11,11,12,12],
      "All 3x": [0,0,0,2,2,2,4,4,4,5,5,5,7,7,7,9,9,9,11,11,11,12,12,12],
      "All 4x": [0,0,0,0,2,2,2,2,4,4,4,4,5,5,5,5,7,7,7,7,9,9,9,9,11,11,11,11,12,12,12,12],
    },
    "Descending": {
      "None": [0,2,4,5,7,9,11,12].reverse(),
      "Top and Bottom": [0,2,4,5,7,9,11,12].reverse(),
      "All 2x": [0,0,2,2,4,4,5,5,7,7,9,9,11,11,12,12].reverse(),
      "All 3x": [0,0,0,2,2,2,4,4,4,5,5,5,7,7,7,9,9,9,11,11,11,12,12,12].reverse(),
      "All 4x": [0,0,0,0,2,2,2,2,4,4,4,4,5,5,5,5,7,7,7,7,9,9,9,9,11,11,11,11,12,12,12,12].reverse(),
    }
  },
  'nat. minor': {
    "Ascending and Descending": {
      "None": [0,2,3,5,7,8,10,12,10,8,7,5,3,2],
      "Top and Bottom": [0,2,3,5,7,8,10,12,12,10,8,7,5,3,2,0],
      "All 2x": [0,0,2,2,3,3,5,5,7,7,8,8,10,10,12,12,10,10,8,8,7,7,5,5,3,3,2,2],
      "All 3x": [0,0,0,2,2,2,3,3,3,5,5,5,7,7,7,8,8,8,10,10,10,12,12,12,10,10,10,8,8,8,7,7,7,5,5,5,3,3,3,2,2,2],
      "All 3x": [0,0,0,0,2,2,2,2,3,3,3,3,5,5,5,5,7,7,7,7,8,8,8,8,10,10,10,10,12,12,12,12,10,10,10,10,8,8,8,8,7,7,7,7,5,5,5,5,3,3,3,3,2,2,2,2],
    },
    "Ascending": {
      "None": [0,2,3,5,7,8,10,12],
      "Top and Bottom": [0,2,3,5,7,8,10,12],
      "All 2x": [0,0,2,2,3,3,5,5,7,7,8,8,10,10,12,12],
      "All 3x": [0,0,0,2,2,2,3,3,3,5,5,5,7,7,7,8,8,8,10,10,10,12,12,12],
      "All 3x": [0,0,0,0,2,2,2,2,3,3,3,3,5,5,5,5,7,7,7,7,8,8,8,8,10,10,10,10,12,12,12,12],
    },
    "Descending": {
      "None": [0,2,3,5,7,8,10,12].reverse(),
      "Top and Bottom": [0,2,3,5,7,8,10,12].reverse(),
      "All 2x": [0,0,2,2,3,3,5,5,7,7,8,8,10,10,12,12].reverse(),
      "All 3x": [0,0,0,2,2,2,3,3,3,5,5,5,7,7,7,8,8,8,10,10,10,12,12,12].reverse(),
      "All 3x": [0,0,0,0,2,2,2,2,3,3,3,3,5,5,5,5,7,7,7,7,8,8,8,8,10,10,10,10,12,12,12,12].reverse(),
    }
  },
  'harm. minor': {
    "Ascending and Descending": {
      "None": [0,2,3,5,7,8,11,12,11,8,7,5,3,2],
      "Top and Bottom": [0,2,3,5,7,8,11,12,12,11,8,7,5,3,2,0],
      "All 2x": [0,0,2,2,3,3,5,5,7,7,8,8,11,11,12,12,11,11,8,8,7,7,5,5,3,3,2,2],
      "All 3x": [0,0,0,2,2,2,3,3,3,5,5,5,7,7,7,8,8,8,11,11,11,12,12,12,11,11,11,8,8,8,7,7,7,5,5,5,3,3,3,2,2,2],
      "All 3x": [0,0,0,0,2,2,2,2,3,3,3,3,5,5,5,5,7,7,7,7,8,8,8,8,11,11,11,11,12,12,12,12,11,11,11,11,8,8,8,8,7,7,7,7,5,5,5,5,3,3,3,3,2,2,2,2],
    },
    "Ascending": {
      "None": [0,2,3,5,7,8,11,12],
      "Top and Bottom": [0,2,3,5,7,8,11,12],
      "All 2x": [0,0,2,2,3,3,5,5,7,7,8,8,11,11,12,12],
      "All 3x": [0,0,0,2,2,2,3,3,3,5,5,5,7,7,7,8,8,8,11,11,11,12,12,12],
      "All 3x": [0,0,0,0,2,2,2,2,3,3,3,3,5,5,5,5,7,7,7,7,8,8,8,8,11,11,11,11,12,12,12,12],
    },
    "Descending": {
      "None": [0,2,3,5,7,8,11,12].reverse(),
      "Top and Bottom": [0,2,3,5,7,8,11,12].reverse(),
      "All 2x": [0,0,2,2,3,3,5,5,7,7,8,8,11,11,12,12].reverse(),
      "All 3x": [0,0,0,2,2,2,3,3,3,5,5,5,7,7,7,8,8,8,11,11,11,12,12,12].reverse(),
      "All 3x": [0,0,0,0,2,2,2,2,3,3,3,3,5,5,5,5,7,7,7,7,8,8,8,8,11,11,11,11,12,12,12,12].reverse(),
    }
  }
}

// const allSharpNotes = [
//   'c/2', 'c#/2', 'd/2', 'd#/2', 'e/2', 'f/2', 'f#/2', 'g/2', 'g#/2', 'a/2', 'a#/2', 'b/2',
//   'c/3', 'c#/3', 'd/3', 'd#/3', 'e/3', 'f/3', 'f#/3', 'g/3', 'g#/3', 'a/3', 'a#/3', 'b/3',
//   'c/4', 'c#/4', 'd/4', 'd#/4', 'e/4', 'f/4', 'f#/4', 'g/4', 'g#/4', 'a/4', 'a#/4', 'b/4',
//   'c/5', 'c#/5', 'd/5', 'd#/5', 'e/5', 'f/5', 'f#/5', 'g/5', 'g#/5', 'a/5', 'a#/5', 'b/5',
//   'c/6', 'c#/6', 'd/6', 'd#/6', 'e/6', 'f/6', 'f#/6', 'g/6', 'g#/6', 'a/6', 'a#/6', 'b/6'
// ]
//
// const allFlatNotes = [
//   'c/2', 'db/2', 'd/2', 'eb/2', 'e/2', 'f/2', 'gb/2', 'g/2', 'ab/2', 'a/2', 'bb/2', 'b/2',
//   'c/3', 'db/3', 'd/3', 'eb/3', 'e/3', 'f/3', 'gb/3', 'g/3', 'ab/3', 'a/3', 'bb/3', 'b/3',
//   'c/4', 'db/4', 'd/4', 'eb/4', 'e/4', 'f/4', 'gb/4', 'g/4', 'ab/4', 'a/4', 'bb/4', 'b/4',
//   'c/5', 'db/5', 'd/5', 'eb/5', 'e/5', 'f/5', 'gb/5', 'g/5', 'ab/5', 'a/5', 'bb/5', 'b/5',
//   'c/6', 'db/6', 'd/6', 'eb/6', 'e/6', 'f/6', 'gb/6', 'g/6', 'ab/6', 'a/6', 'bb/6', 'b/6'
// ]

const keyNotesObj = {
  'Ab': {
    'major': ['ab/3', 'a/3', 'bb/3', 'b/3', 'c/4', 'db/4', 'd/4', 'eb/4', 'e/4', 'f/4', 'gb/4', 'g/4', 'ab/4'],
    'minor': ['ab/3', 'a/3', 'bb/3', 'cb/4', 'c/4', 'db/4', 'd/4', 'eb/4', 'fb/4', 'f/4', 'gb/4', 'g/4', 'ab/4']
  },
  'A': {
    'major': ['a/3', 'a#/3', 'b/3', 'c/4', 'c#/4', 'd/4', 'd#/4', 'e/4', 'f/4', 'f#/4', 'g/4', 'g#/4', 'a/4'],
    'minor': ['a/3', 'a#/3', 'b/3', 'c/4', 'c#/4', 'd/4', 'd#/4', 'e/4', 'f/4', 'f#/4', 'g/4', 'g#/4', 'a/4']
  },
  'A#': {
    'major': null,
    'minor': ['a#/3', 'b/3', 'b#/3', 'c#/4', 'd/4', 'd#/4', 'e/4', 'e#/4', 'f/4', 'f#/4', 'g/4', 'g#/4', 'gx/4', 'a#/4']
  },
  'Bb': {
    'major': ['bb/3', 'b/3', 'c/4', 'db/4', 'd/4', 'eb/4', 'e/4', 'f/4', 'gb/4', 'g/4', 'ab/4', 'a/4', 'bb/4'],
    'minor': ['bb/3', 'b/3', 'c/4', 'db/4', 'd/4', 'eb/4', 'e/4', 'f/4', 'gb/4', 'g/4', 'ab/4', 'a/4', 'bb/4'],
  },
  'B': {
    'major': ['b/3', 'c/4', 'c#/4', 'd/4', 'd#/4', 'e/4', 'f/4', 'f#/4', 'g/4', 'g#/4', 'a/4', 'a#/4', 'b/4'],
    'minor': ['b/3', 'c/4', 'c#/4', 'd/4', 'd#/4', 'e/4', 'f/4', 'f#/4', 'g/4', 'g#/4', 'a/4', 'a#/4', 'b/4'],
  },
  'Cb': {
    'major': ['cb/4', 'c/4', 'db/4', 'd/4', 'eb/4', 'fb/4', 'f/4', 'gb/4', 'g/4', 'ab/4', 'a/4', 'bb/4', 'cb/5' ],
    'minor': null
  },
  'C': {
    'major': ['c/4', 'c#/4', 'd/4', 'd#/4', 'e/4', 'f/4', 'f#/4', 'g/4', 'g#/4', 'a/4', 'a#/4', 'b/4', 'c/5'],
    'minor': ['c/4', 'db/4', 'd/4', 'eb/4', 'e/4', 'f/4', 'gb/4', 'g/4', 'ab/4', 'a/4', 'bb/4', 'b/4', 'c/5']
  },
  'C#': {
    'major': ['c#/4', 'd/4', 'd#/4', 'e/4', 'e#/4', 'f#/4', 'g/4', 'g#/4', 'a/4', 'a#/4', 'b/4', 'b#/4', 'c#/5' ],
    'minor': ['c#/4', 'd/4', 'd#/4', 'e/4', 'e#/4', 'f#/4', 'g/4', 'g#/4', 'a/4', 'a#/4', 'b/4', 'b#/4', 'c#/5' ],
  },
  'Db': {
    'major': ['db/4', 'd/4', 'eb/4', 'e/4', 'f/4', 'gb/4', 'g/4', 'ab/4', 'a/4', 'bb/4', 'b/4', 'c/5', 'db/5' ],
    'minor': null
  },
  'D': {
    'major': ['d/4', 'd#/4', 'e/4', 'f/4', 'f#/4', 'g/4', 'g#/4', 'a/4', 'a#/4', 'b/4', 'c/4', 'c#/5', 'd/5'],
    'minor': ['d/4', 'eb/4', 'e/4', 'f/4', 'gb/4', 'g/4', 'ab/4', 'a/4', 'bb/4', 'b/4', 'c/5', 'c#/5', 'd/5'],
  },
  'D#': {
    'major': null,
    'minor': ['d#/4', 'e/4', 'e#/4', 'f#/4', 'g/4', 'g#/4', 'a/4', 'a#/4', 'b/4', 'c/5', 'c#/5', 'cx/5', 'd#/5']
  },
  'Eb': {
    'major': ['eb/4', 'e/4', 'f/4', 'gb/4', 'g/4', 'ab/4', 'a/4', 'bb/4', 'b/4', 'c/5', 'db/5', 'd/5', 'eb/5'],
    'minor': ['eb/4', 'e/4', 'f/4', 'gb/4', 'g/4', 'ab/4', 'a/4', 'bb/4', 'cb/5', 'c/5', 'db/5', 'd/5', 'eb/5']
  },
  'E': {
    'major': ['e/3', 'f/3', 'f#/3', 'g/3', 'g#/3', 'a/3', 'a#/3', 'b/3', 'c/3', 'c#/4', 'd/4', 'd#/4', 'e/4'],
    'minor': ['e/3', 'f/3', 'f#/3', 'g/3', 'g#/3', 'a/3', 'a#/3', 'b/3', 'c/3', 'c#/4', 'd/4', 'd#/4', 'e/4']
  },
  'F': {
    'major': ['f/3', 'gb/3', 'g/3', 'ab/3', 'a/3', 'bb/3', 'b/3', 'c/4', 'db/4', 'd/4', 'eb/4', 'e/4', 'f/4'],
    'minor': ['f/3', 'gb/3', 'g/3', 'ab/3', 'a/3', 'bb/3', 'b/3', 'c/4', 'db/4', 'd/4', 'eb/4', 'e/4', 'f/4']
  },
  'F#': {
    'major': ['f#/3', 'g/3', 'g#/3', 'a/3', 'a#/3', 'b/3', 'c/4', 'c#/4', 'd/4', 'd#/4', 'e/4', 'e#/4', 'f#/4'],
    'minor': ['f#/3', 'g/3', 'g#/3', 'a/3', 'a#/3', 'b/3', 'c/4', 'c#/4', 'd/4', 'd#/4', 'e/4', 'e#/4', 'f#/4'],
  },
  'Gb': {
    'major': ['gb/3', 'g/3', 'ab/3', 'a/3', 'bb/3', 'cb/4', 'c/4', 'db/4', 'd/4', 'eb/4', 'e/4', 'f/4', 'gb/4' ],
    'minor': null
  },
  'G': {
    'major': ['g/3', 'g#/3', 'a/3', 'a#/3', 'b/3', 'c/4', 'c#/4', 'd/4', 'd#/4', 'e/4', 'f/4', 'f#/4', 'g/4'],
    'minor': ['g/3', 'ab/3', 'a/3', 'bb/3', 'b/3', 'c/4', 'db/4', 'd/4', 'eb/4', 'e/4', 'f/4', 'f#/4', 'g/4']
  },
  'G#': {
    'major': null,
    'minor': ['g#/3', 'a/3', 'a#/3', 'b/3', 'c/4', 'c#/4', 'd/4', 'd#/4', 'e/4', 'f/4', 'f#/4', 'g/4', 'g#/4']
  },
}

// const keyNotesObj = {
//   'Ab': {
//     'major': allFlatNotes.slice(20, 33),
//     'minor': allFlatNotes.slice(20, 33),
//   },
//   'A': {
//     'major': allSharpNotes.slice(21, 34),
//     'minor': allSharpNotes.slice(21, 34)
//   },
//   'A#': {
//     'major': allSharpNotes.slice(22, 35),
//     'minor': allSharpNotes.slice(22, 35)
//   },
//   'Bb': {
//     'major': allFlatNotes.slice(22, 35),
//     'minor': allFlatNotes.slice(22, 35)
//   },
//   'B': {
//     'major': allSharpNotes.slice(23, 36),
//     'minor': allSharpNotes.slice(23, 36)
//   },
//   'Cb': {
//     'major':  allFlatNotes.slice(23, 36),
//     'minor':  allFlatNotes.slice(23, 36)
//   },
//   'C': {
//     'major':  allSharpNotes.slice(24, 37),
//     'minor':  allFlatNotes.slice(24, 37)
//   },
//   'C#': {
//     'major':  allSharpNotes.slice(25, 38),
//     'minor':  allSharpNotes.slice(25, 38)
//   },
//   'Db': {
//     'major':  allFlatNotes.slice(25, 38),
//     'minor':  allFlatNotes.slice(25, 38)
//   },
//   'D': {
//     'major':  allSharpNotes.slice(26, 39),
//     'minor':  allFlatNotes.slice(26, 39)
//   },
//   'D#': {
//     'major':  allSharpNotes.slice(27, 40),
//     'minor':  allSharpNotes.slice(27, 40)
//   },
//   'Eb': {
//     'major':  allFlatNotes.slice(27, 40),
//     'minor':  allFlatNotes.slice(27, 40),
//   },
//   'E': {
//     'major':  allSharpNotes.slice(28, 41),
//     'minor':  allSharpNotes.slice(28, 41)
//   },
//   'F': {
//     'major':  allFlatNotes.slice(29, 42),
//     'minor':  allFlatNotes.slice(29, 42)
//   },
//   'F#': {
//     'major':  allSharpNotes.slice(30, 43),
//     'minor':  allSharpNotes.slice(30, 43)
//   },
//   'Gb': {
//     'major':  allFlatNotes.slice(30, 43),
//     'minor':  allFlatNotes.slice(30, 43)
//   },
//   'G': {
//     'major':  allSharpNotes.slice(41, 44),
//     'minor':  allFlatNotes.slice(41, 44),
//   },
//   'G#': {
//     'major':  allSharpNotes.slice(42, 45),
//     'minor':  allSharpNotes.slice(42, 45)
//   },
// }

const countAccidentals = {
  'Ab': {
    'major': '4 flats',
    'minor': '7 flats',
  },
  'A': {
    'major': '3 sharps',
    'minor': '0 sharps'
  },
  'A#': {
    'major': null,
    'minor': '7 sharps'
  },
  'Bb': {
    'major': '2 flats',
    'minor': '5 flats'
  },
  'B': {
    'major': '5 sharps',
    'minor': '2 sharps'
  },
  'Cb': {
    'major':  '7 flats',
    'minor': null
  },
  'C': {
    'major':  '0 sharps',
    'minor':  '3 flats'
  },
  'C#': {
    'major':  '7 sharps',
    'minor':  '4 sharps'
  },
  'Db': {
    'major':  '5 flats',
    'minor':  null
  },
  'D': {
    'major':  '2 sharps',
    'minor':  '1 flat'
  },
  'D#': {
    'major':  null,
    'minor':  '6 sharps'
  },
  'Eb': {
    'major':  '3 flats',
    'minor':  '6 flats',
  },
  'E': {
    'major':  '4 sharps',
    'minor':  '1 sharp'
  },
  'F': {
    'major':  '1 flat',
    'minor':  '4 flats'
  },
  'F#': {
    'major':  '6 sharps',
    'minor':  '3 sharps'
  },
  'Gb': {
    'major':  '6 flats',
    'minor':  null
  },
  'G': {
    'major':  '1 sharps',
    'minor':  '2 flats'
  },
  'G#': {
    'major':  null,
    'minor':  '5 sharps'
  }
}

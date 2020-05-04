import { combineReducers } from 'redux'

const settingsReducer = combineReducers({
  key: keyReducer,
  keyNotes: keyNotesReducer,
  category: categoryReducer,
  bpm: bpmReducer,
  scale: scaleReducer
})

export default settingsReducer

function keyReducer(state = 'C', action) {
  switch(action.type) {
    case 'SET_KEY':
      return action.key

    default:
      return state;
  }
}

function categoryReducer(state = 'sharps', action) {
  switch(action.type) {
    case 'SET_KEY':
      return keyCategory[action.key]

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

function keyNotesReducer(state=['c/4', 'd/4', 'e/4', 'f/4', 'g/4', 'a/4', 'b/4', 'c/5' ], action){
  switch(action.type) {
    case 'SET_KEY':
      return keyNotesObj[action.key]

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
  'C': ['c/4', 'd/4', 'e/4', 'f/4', 'g/4', 'a/4', 'b/4', 'c/5' ],
  'F': ['f/3', 'g/3', 'a/3', 'bb/3', 'c/4', 'd/4', 'e/4', 'f/4' ],
  'G': ['g/3', 'a/3', 'b/3', 'c/4', 'd/4', 'e/4', 'f#/4', 'g/4' ],
  'D': ['d/4', 'e/4', 'f#/4', 'g/4', 'a/4', 'b/4', 'c#/5', 'd/5' ],
  'A': ['a/3', 'b/3', 'c#/4', 'd/4', 'e/4', 'f#/4', 'g#/4', 'a/4' ],
  'E': ['e/3', 'f#/3', 'g#/3', 'a/3', 'b/3', 'c#/4', 'd#/4', 'e/4' ],
  'B': ['b/3', 'c#/4', 'd#/4', 'e/4', 'f#/4', 'g#/4', 'a#/4', 'b/4' ],
  'Bb': ['bb/3', 'c/4', 'd/4', 'eb/4', 'f/4', 'g/4', 'a/4', 'bb/4' ],
  'Eb': ['eb/4', 'f/4', 'g/4', 'ab/4', 'bb/4', 'c/5', 'd/5', 'eb/5' ],
  'Ab': ['ab/3', 'bb/3', 'c/4', 'db/4', 'eb/4', 'f/4', 'g/4', 'ab/4' ],
  'Db': ['db/4', 'eb/4', 'f/4', 'gb/4', 'ab/4', 'bb/4', 'c/5', 'db/5' ],
  'F#': ['f#/3', 'g#/3', 'a#/3', 'b/3', 'c#/4', 'd#/4', 'e#/4', 'f#/4'],
  'C#': ['c#/4', 'd#/4', 'e#/4', 'f#/4', 'g#/4', 'a#/4', 'b#/4', 'c#/5' ],
  'Gb': ['gb/3', 'ab/3', 'bb/3', 'cb/4', 'db/4', 'eb/4', 'f/4', 'gb/4' ],
  'Cb': ['cb/4', 'db/4', 'eb/4', 'fb/4', 'gb/4', 'ab/4', 'bb/4', 'cb/5' ],
}

import { combineReducers } from 'redux'

const settingsReducer = combineReducers({
  key: keyReducer,
  category: categoryReducer,
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
}

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

function categoryReducer(state = null, action) {
  switch(action.type) {

    default:
      return state;
  }
}

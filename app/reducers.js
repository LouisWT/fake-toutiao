import { combineReducers } from 'redux-immutable'
import { reducer as formReducer } from 'redux-form/immutable'

const reducers = {
  form: formReducer,
}

export default combineReducers(reducers)

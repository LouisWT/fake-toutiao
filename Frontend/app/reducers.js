import { combineReducers } from 'redux-immutable'
import { reducer as formReducer } from 'redux-form/immutable'
import { defaultReducers as Login } from 'containers/Signup/reducer'

const reducers = {
  Login,
  form: formReducer,
}

export default combineReducers(reducers)

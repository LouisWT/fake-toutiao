import { combineReducers } from 'redux-immutable'
import { reducer as formReducer } from 'redux-form/immutable'

import users from 'reducers/users'
import { defaultReducers as User } from 'containers/User/reducer'

const reducers = {
  User,
  users,
}

export default combineReducers(reducers)

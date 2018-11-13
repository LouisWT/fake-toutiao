import { combineReducers } from 'redux-immutable'
import { reducer as formReducer } from 'redux-form/immutable'

import chapters from 'reducers/chapters'
import comments from 'reducers/comments'
import documents from 'reducers/documents'
import labels from 'reducers/labels'
import libraries from 'reducers/libraries'
import mine from 'reducers/mine'
import replies from 'reducers/replies'
import users from 'reducers/users'
import { defaultReducers as Class } from 'containers/Class/reducer'
import { defaultReducers as Document } from 'containers/Document/reducer'
import { defaultReducers as Header } from 'containers/Header/reducer'
import { defaultReducers as Login } from 'containers/Login/reducer'
import { defaultReducers as Player } from 'containers/Player/reducer'
import { defaultReducers as SignUp } from 'containers/SignUp/reducer'
import { defaultReducers as User } from 'containers/User/reducer'

const reducers = {
  Class,
  Document,
  Header,
  Login,
  Player,
  SignUp,
  User,
  chapters,
  comments,
  documents,
  form: formReducer,
  labels,
  libraries,
  mine,
  replies,
  users,
}

export default combineReducers(reducers)

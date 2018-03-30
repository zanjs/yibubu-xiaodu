
// import { combineReducers } from 'redux'
// import merge from 'lodash/merge'

import posts from './posts'
import topic from './topic'
import comment from './comment'
import user from './user'
import notification from './notification'
import people from './people'
import followPeople from './follow-people'
import clientInstalled from './client-installed'
import countries from './countries'
import report from './report'
import block from './block'

let states = {
  posts,
  topic,
  comment,
  user,
  notification,
  people,
  followPeople,
  clientInstalled,
  countries,
  report,
  block
}


export default states

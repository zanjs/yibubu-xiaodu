
import merge from 'lodash/merge'

let initialState = {}

export default function clientInstalled(state = initialState, action = {}) {
  switch (action.type) {

    case 'HAS_CLIENT_INSTALLED':
      var { name } = action
      state[name] = true
      return merge({}, state, {})
    default:
      return state;
  }
}

export const getClientInstalled = (state, name) => {
  return state.clientInstalled
}

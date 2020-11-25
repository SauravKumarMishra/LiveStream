import { CREATE_STREAM, DELETE_STREAM, EDIT_STREAM, FETCH_STREAM, FETCH_STREAMS } from "../actions/types"
import _ from 'lodash'

interface IAction {
  type: string,
  payload: any
}

const streamReducer = (state={}, action: IAction) => {
  switch (action.type) {
    case FETCH_STREAMS:
      return {...state, ..._.mapKeys(action.payload, 'id')}

    case FETCH_STREAM:
      return { ...state, [action.payload.id]: action.payload}

    case CREATE_STREAM:
      return { ...state, [action.payload.id]: action.payload}
      
    case EDIT_STREAM:
      return { ...state, [action.payload.id]: action.payload}

    case DELETE_STREAM:
      return _.omit(state, action.payload)
      
    default:
      return state
  }
}

export default streamReducer
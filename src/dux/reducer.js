import axios from 'axios'
const initialState = {
  data: {},
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_DATA':
      return action.payload ? { ...state, data: action.payload } : state
    case 'REMOVE_DATA':
      return initialState
    default:
      return state
  }
}

export function setData(data) {
  return {
    type: 'SET_DATA',
    payload: data,
  }
}

function removeData() {
  return {
    type: 'REMOVE_DATA',
  }
}

export function getSession() {
  return async (dispatch) => {
    const res = await axios.get('/auth/me')
    dispatch(setData(res.data))
  }
}
export function createSession(info) {
  return async (dispatch) => {
    const res = await axios.post('/auth/add_info', info)
    // dispatch(setData(res.data))
    // uncommment to have thunk add session
  }
}
export function destroySession() {
  return async (dispatch) => {
    await axios.delete('/auth/delete')
    dispatch(removeData())
  }
}

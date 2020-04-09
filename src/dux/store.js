import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import reducer from './reducer'

const logger = createLogger({
  collapsed: true,
  diff: false,
})
export default createStore(reducer, applyMiddleware(thunkMiddleware, logger))

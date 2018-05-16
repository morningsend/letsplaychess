import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import rootReducer from './reducers'


const logger = createLogger({
    level: 'console'
})
export const store = createStore(
    rootReducer,
    applyMiddleware(ReduxThunk, logger)
)
export default store
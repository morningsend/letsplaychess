import { createStore, applyMiddleware, compose } from 'redux'
import ReduxThunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import rootReducer from './reducers'


const logger = createLogger({
    level: 'console'
})
export const store = createStore(
    rootReducer,
    {},
    applyMiddleware(ReduxThunk)
)
export default store
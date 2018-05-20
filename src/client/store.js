import { createStore, applyMiddleware, compose } from 'redux'
import { loadState, saveState } from './localStorage'
import ReduxThunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import rootReducer from './reducers'
import { debounce } from './debounce';

const logger = createLogger({
    level: 'console'
})


export const store = createStore(
    rootReducer,
    loadState(),
    applyMiddleware(ReduxThunk)
)


store.subscribe(debounce(() => {
    const state = store.getState()
    saveState({
        authen: state.authen,
        user: state.user,
    })
    },
    1000)
)

export default store
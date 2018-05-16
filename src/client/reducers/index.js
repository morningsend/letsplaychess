import { combineReducers } from 'redux'
import { authen } from './authen'
export function profile(state, action) {
    return {}
}

export function game(state, action) {
    return {}
}


export const rootReducer = combineReducers({
    profile,
    game,
    authen,
})

export default rootReducer

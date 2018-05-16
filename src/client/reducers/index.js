import { combineReducers } from 'redux'

export function profile(state, action) {
    return {}
}

export function authen(state, action) {
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

import { combineReducers } from 'redux'
import { authen } from './authen'
import { match } from './match'
import { user}  from './user'

export const rootReducer = combineReducers({
    authen,
    match,
    user,
})

export default rootReducer

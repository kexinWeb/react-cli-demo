import { reducer } from './register'
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'


const reducers = combineReducers({
    ...reducer,
    routing: routerReducer
})
export default reducers
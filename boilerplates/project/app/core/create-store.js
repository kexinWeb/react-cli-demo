import rootReducer from './create-reducers'
import rootSaga from './create-saga'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware  from 'redux-saga'

const sagaMiddleware = createSagaMiddleware()


const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(rootSaga)

export default store
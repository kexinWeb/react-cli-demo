import "regenerator-runtime/runtime"
import React from 'react'
import ReactDOM from 'react-dom'
import store from './create-store'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { Router,  browserHistory } from 'react-router'
import { routes } from './register'


const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
    <Provider store={store}>
        <Router history={history} routes={routes}>
        </Router>
    </Provider>,
    document.body.appendChild(document.createElement('div'))
)

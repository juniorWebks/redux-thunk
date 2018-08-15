import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import fetchUsers, { setUsersAction, usersStoppedLoadingAction, usersStartedLoadingAction } from './state/fetchUsers'

const reducer = combineReducers({
    fetchUsers
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(
    reducer,
    composeEnhancers(
        applyMiddleware(thunk)
    )
)
fetch('https://randomuser.me/api?results=10')
.then(response =>response.json())
.then(data => {
    store.dispatch(setUsersAction('data'))
    store.dispatch(usersStoppedLoadingAction())
})
import { combineReducers, legacy_createStore as createStore } from 'redux'

import { toyReducer } from './reducers/toy.reducer'


const rootReducer = combineReducers({
    toyModule: toyReducer,
    // userModule: userReducer
})

export const store = createStore(rootReducer)

// For debug only!
store.subscribe(() => {
    console.log('Current state is:', store.getState())
})

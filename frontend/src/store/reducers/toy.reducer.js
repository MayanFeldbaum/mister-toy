import { toyService } from "../../services/toy.service"

export const SET_TOYS = 'SET_TOYS'
export const REMOVE_TOY = 'REMOVE_TOY'
export const ADD_TOY = 'ADD_TOY'
export const UPDATE_TOY = 'UPDATE_TOY'
export const SET_IS_LOADING = 'SET_IS_LOADING'
export const SET_FILTER = 'SET_FILTER'

const initialState = {
    toys: [],
    isLoading: false,
    filterBy: toyService.getDefaultFilter(),
}


export function toyReducer(state = initialState, action) {
    let toys
    switch (action.type) {
        case SET_TOYS:
            return { ...state, toys: action.toys }
        case SET_IS_LOADING:
            return { ...state, isLoading: action.isLoading }

        case REMOVE_TOY:
            // lastRemovedTou = state.toys.find(c => c._id === action.toyId)
            toys = state.toys.filter(t => t._id !== action.toyId)
            return { ...state, toys }

        // case UNDO_REMOVE_TOY:
        //     ({ lastRemovedToy } = state)
        //     toys = [lastRemovedToy, ...state.toys]
        //     return { ...state, toys, lastRemovedToy: null }

        case ADD_TOY:
            toys = [...state.toys, action.toy]
            return { ...state, toys }

        case UPDATE_TOY:
            toys = state.toys.map(toy => toy._id === action.toy._id ? action.toy : toy)
            return { ...state, toys }

        case SET_FILTER:
            return { ...state, filterBy:action.filterBy }

        default:
            return state
    }
}



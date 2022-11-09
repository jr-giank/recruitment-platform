import { types } from "./types"

const initialState = {}

export const vacancyReducer = (state = initialState, action) => {

    if(action.type === types.add){
        state = {...action.payload }
    }

    if(action.type === types.remove){
        state = initialState
    }

    return state
}
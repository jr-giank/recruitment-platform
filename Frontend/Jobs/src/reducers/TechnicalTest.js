import { types } from "./types"

const initialState = { toEdit: false}

export const technicalTestReducer = (state = initialState, action) => {

    if(action.type === types.add){
        state = {...action.payload, toEdit: true }
    }

    if(action.type === types.remove){
        state = initialState
    }

    return state
}
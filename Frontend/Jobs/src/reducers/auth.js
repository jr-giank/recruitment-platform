import { types } from "./types"

const initialState = {logged: false}

/* CANDIDATE or COMPANY logged in should have next data:

        token
        name
        lastName (if candidate)
        profilePic
        email
        role
*/

export const authReducer = (state = initialState, action) => {

    if(action.type === types.login){
        state = {...action.payload, logged: true}
    }

    if(action.type === types.logout){
        state = initialState
    }

    return state
}
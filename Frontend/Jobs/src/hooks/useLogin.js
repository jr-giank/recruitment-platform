import  jwt_decode from 'jwt-decode'
import { useContext } from 'react'
import { authContext } from '../context/context'
import { types } from '../reducers/types'

export const useLogin = () =>{

    const { dispatch  } = useContext(authContext) 

    const setLogged = (tokens) =>{
        
        const decodedToken = jwt_decode(tokens.access)
        
        // 0 --> Candidato
        // 1 --> Reclutador
        const rol = decodedToken.is_staff ? 1 : 0

        const payload = {...decodedToken,
                        rol, 
                        token: tokens.access, 
                        tokenRefreshData: tokens.refresh
                    }
        
        dispatch({
            type: types.login,
            payload
        })
        
        window.localStorage.setItem("itJobToken", JSON.stringify({...payload}))
    }

    return setLogged

}
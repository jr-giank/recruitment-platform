import React, { useReducer } from 'react'
import { authContext } from './context/context'
import { authReducer } from './reducers/auth'
import AppRouter from './routes/AppRouter'

const App = () => {

  const [ auth,  dispatch ] = useReducer(authReducer, {})

  return (
      <authContext.Provider value={{auth, dispatch}}>
          <AppRouter />
      </authContext.Provider>
  )
}

export default App
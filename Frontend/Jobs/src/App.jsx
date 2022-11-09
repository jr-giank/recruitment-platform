import React, { useReducer } from 'react'
import { authContext, vacancyContext } from './context/context'
import { authReducer } from './reducers/auth'
import { vacancyReducer } from './reducers/vacancy'
import AppRouter from './routes/AppRouter'

const App = () => {

  const [ auth,  dispatch ] = useReducer(authReducer, {})
  const [ vac,  dispatch2 ] = useReducer(vacancyReducer, {})
  
  return (
      <authContext.Provider value={{auth, dispatch}}>
      <vacancyContext.Provider value={{vac, dispatch2}}>
          <AppRouter />
      </vacancyContext.Provider>
      </authContext.Provider>
  )
}

export default App
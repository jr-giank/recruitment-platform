import React, { useContext, useEffect, useState } from 'react'
import { Route, Routes, BrowserRouter as Router, Navigate } from 'react-router-dom'

import { authContext, inVideoContext } from '../context/context'

import Navigation from '../sharedComponents/navigation/Navigation'
import AuthRouter from './AuthRouter'
import Loading from '../sharedComponents/ui/Loading'
import NoAccess from '../pages/security/NoAccess'
import PrivateRouter from './PrivateRouter'
import { types } from '../reducers/types'

const AppRouter = () => {

  const [ isAuthChecked, setIsAuthChecked ] = useState(false)
  const { auth, dispatch } = useContext(authContext)
  const [ inVideo, setInVideo ] = useState(false)

  useEffect(() => {

    let activeUser = JSON.parse(window.localStorage.getItem("itJobToken"))

    if(activeUser){
      dispatch({type: types.login, payload: {...activeUser} })
    }

    setIsAuthChecked(true)
  }, [auth.logged])

  return (
    <>
      {
        isAuthChecked ? (
          <Router>
            <inVideoContext.Provider value={{inVideo, setInVideo}} >
              {!inVideo && <Navigation /> }
                  <Routes>
                      <Route path='/'  element={<Navigate to='/auth/login' /> } /> 
                      <Route 
                        exact path='/auth/*' 
                        element={!auth.logged ? <AuthRouter /> :  <Navigate to='/app'/> } 
                        />
                      <Route exact path='/app/*'  element={auth.logged ? <PrivateRouter /> : <Navigate to='/auth/login' />  } />
                      <Route exact path='/NoAccess' element={<NoAccess />} />
                  </Routes>
              </inVideoContext.Provider>
            </Router>
        ):<Loading />
      }
    </>
  )
}

export default AppRouter
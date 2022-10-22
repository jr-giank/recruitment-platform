import React, { useContext, useEffect, useState } from 'react'
import { Route, Routes, BrowserRouter as Router, Navigate } from 'react-router-dom'

import { authContext } from '../context/context'

import Navigation from '../sharedComponents/navigation/Navigation'
import AuthRouter from './AuthRouter'
import Loading from '../sharedComponents/ui/Loading'
import NoAccess from '../pages/security/NoAccess'
import PrivateRouter from './PrivateRouter'
import { types } from '../reducers/types'

const AppRouter = () => {

  const [ isAuthChecked, setIsAuthChecked ] = useState(false)
  const { auth, dispatch } = useContext(authContext)

  useEffect(() => {

    let activeUser = JSON.parse(window.localStorage.getItem("itJobToken"))

    if(activeUser){
      dispatch({type: types.login, payload: activeUser})
    }

    setIsAuthChecked(true)
  }, [auth.logged])

  return (
    <>
      {
        isAuthChecked ? (
          <Router>
              <Navigation />
                <Routes>
                    {/* <Route path='/'  element={<SignInPage /> } /> */}
                    <Route 
                      exact path='/auth/*' 
                      element={!auth.logged ? <AuthRouter /> :  <Navigate to='/app'/> } 
                    />
                    <Route exact path='/app/*'  element={auth.logged ? <PrivateRouter /> : <Navigate to='/auth/login' />  } />
                    <Route exact path='/NoAccess' element={<NoAccess />} />
                </Routes>
            </Router>
        ):<Loading />
      }
    </>
  )
}

export default AppRouter
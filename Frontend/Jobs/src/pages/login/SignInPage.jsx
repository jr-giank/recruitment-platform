import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useForm } from '../../hooks/useForm'
import { post } from '../../services/services'

import { useLogin } from '../../hooks/useLogin'

const SignInPage = () => {

    const [ isDisabled, setIsDisabled  ] = useState(true)
    
    const [ formValues, handleInputChanges ] = useForm({
        email: "",
        password: ""
    })
    
    const setLogged = useLogin()
    
     useEffect(() => {
        if(formValues.email !== "" && formValues.password !== ""){
            setIsDisabled(false)
        }else{
            setIsDisabled(true)
        }
    }, [formValues])

    const handleOnSubmit = (e) => {        
        e.preventDefault()

        post('token/', {'Content-Type': 'application/json'}, formValues)
        .then(data =>{
            
            if(data.access){
                setLogged({access: data.access, refresh: data.refresh})
               
            }
            else{
                Swal.fire("Credenciales inválidas", "Su contraseña o correo son incorrectos", "error")
            }
        }).catch(e => {
            Swal.fire("Error", "Hubo un error al conectarse al servidor", "error")
          })
    }

    return (
        <form action="" className='w-full flex items-center justify-center h-[87%] mt-20'>
            <div className='flex flex-col w-1/3 border border-fifth shadow-lg py-4 px-12 rounded-lg min-w-[350px]'>
                
                <h1 className='text-center font-bold mb-4'>Inicio de sesión</h1>
                
                <input 
                    type="text" 
                    name="email" 
                    value={formValues.email} 
                    onChange={handleInputChanges} 
                    placeholder='Correo Electrónico' 
                />
                
                <input 
                    type="password" 
                    name="password" 
                    value={formValues.password}
                    onChange={handleInputChanges} 
                    placeholder='Contraseña' 
                />

                <button 
                    disabled={isDisabled} 
                    type='submit' 
                    className={`bg-primary mt-4 rounded-md py-2 text-white disabled:bg-sixth`} 
                    onClick={handleOnSubmit}
                >
                    Iniciar Sesión
                </button>

                <div className='flex flex-col mt-6'>
                    <small className='mb-1'>¿Aun no tienes cuenta?</small>
                    <small><Link to='/auth/candidates/signUp'className='text-seventh hover:underline'> Registrate para ver vacantes </Link></small>
                    <small><Link to='/auth/recruiter/signUp'className='text-seventh hover:underline'> Regístrate como empresa    </Link></small>
                </div>

            </div>
        </form>
  )
}

export default SignInPage
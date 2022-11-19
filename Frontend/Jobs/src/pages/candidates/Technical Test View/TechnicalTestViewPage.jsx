import React, {useState, useContext, useEffect} from "react";
import Loading from '../../../sharedComponents/ui/Loading'
import { authContext } from '../../../context/context'
import { get } from '../../../services/services' 
import TechnicalTestDescription from "./components/TechnicalTestDescription";
import { useParams } from "react-router-dom";

const TechnicalTestViewPage = () => {
    const {auth} = useContext(authContext)
    const {id} = useParams()
    const [ isLoading, setIsLoading ] = useState(false)
    const [ test, setTechnicalTest ] = useState([])

    useEffect(() => {
        setIsLoading(true)
        get(`prueba/unica/${id}/`, { "Authorization":`Bearer ${auth.token}` })
        .then((res) => {
            console.log(res)
            if (res.exito){
              console.log(res.data)
              setTechnicalTest(res.data)
            }
            setIsLoading(false)
        })
    }, [])

    return(
        <div className='flex mx-10 mt-14 h-[91%]'>
            <TechnicalTestDescription techTest={test} setTechnicalTest={setTechnicalTest}/>
        </div>

    )

}
export default TechnicalTestViewPage
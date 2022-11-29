import React, {useState, useContext, useEffect} from "react";
import Loading from '../../../sharedComponents/ui/Loading'
import { authContext } from '../../../context/context'
import { get } from '../../../services/services' 
import TechnicalTestDescription from "./components/TechnicalTestDescription";
import { useParams } from "react-router-dom";

const TechnicalTestViewPage = () => {

    const {auth} = useContext(authContext)
    const {id} = useParams()
    const [ isLoading, setIsLoading ] = useState(true)
    const [ techTest, setTechnicalTest ] = useState({})
    const [ deadline, setDeadline ] = useState("")

    useEffect(() => {
        get(`prueba/asignada/unica/${id}/`, { "Authorization":`Bearer ${auth.token}` })
        .then((res) => {
            console.log(res)
            if (res.exito){
              setTechnicalTest({...res.data[0]})
              setDeadline(new Date(res.data[0].fecha_limite))
            }
            setIsLoading(false)
        })
    }, [])

    return(
        <div className='flex mx-10 mt-14 h-[91%]'>
            {
                isLoading
                    ? 
                 <Loading /> 
                    : 
                 <TechnicalTestDescription techTest={techTest} setTechnicalTest={setTechnicalTest} deadLine={deadline} />
            }
        </div>
    )
}
export default TechnicalTestViewPage
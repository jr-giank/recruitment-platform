
import { useState } from "react"

export const useForm = (initialState = {}) => {

    const [formValues, setFormValues] = useState(initialState)
    
    const handleInputChanges = ({ target }) =>{
        setFormValues({
            ...formValues,
            [ target.name ]: target.value
        })
    }

    const handleCheckChanges = ({target})=>{
        
        console.log(target.checked)
        setFormValues({
            ...formValues,
            [ target.name ]: target.checked
        })
    }
    
    const reset = () => {
        setFormValues(initialState)
    }
    
    return [formValues, handleInputChanges, handleCheckChanges, reset]

}
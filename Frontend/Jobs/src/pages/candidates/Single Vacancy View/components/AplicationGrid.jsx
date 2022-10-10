import React, {useState}from 'react'
import { useForm } from '../../../../hooks/useForm';

const AplicationGrid = () => {

    const [selectedFile, setSelectedFile] = useState();


	const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsSelected(true);
	};

	const handleSubmission = () => {
	};

    const [ formValues, handleInputChanges ] = useForm({
        coverLetter:"",

    })

    return(
        <div className='  py-2'>

            <div className=''>
                <h4 className='text-lg font-medium'>Carta de presentacion</h4>
                <textarea  
                    name="coverLetter" 
                    id="coverLetter" 
                    placeholder='¿Porque soy el indicado para este empleo?'
                    rows = '5'
                    value={formValues.coverLetter}
                    onChange={handleInputChanges}
                    className='w-[85%] mx-8'
                />
            </div>

            <h4 className='text-lg font-medium'>Curriculum vitae</h4>
            <input type="file" name="file" className='mx-8 w-[85%] ' accept='application/pdf' onChange={changeHandler} />
            

            <button className='bg-primary text-white text-sm mt-5 ml-8 px-10 py-2 ' onClick={handleSubmission}>
                Enviar
            </button>

        </div>
    )


}
export default AplicationGrid
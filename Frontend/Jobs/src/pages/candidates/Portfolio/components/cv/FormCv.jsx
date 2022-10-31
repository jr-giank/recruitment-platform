import React from 'react'
import { useState } from 'react';

const FormCv = ({cv1, cv2, onSubmit}) => {
  
  const [selectedFiles, setSelectedFiles] = useState({
    cv1: cv1 || '',
    cv2: cv2 || '',
  });

  const changeHandler = (event, name) => {
    console.log(event.target.files[0])
		setSelectedFiles({...selectedFiles, [name]:event.target.files[0]});
	};

  return (
    <form>
          <input 
            type="file" 
            name="cv1" 
            className='w-full'
            value={selectedFiles.cv1}
            accept='application/pdf' 
            onChange={changeHandler} 
          />      
          <input 
            type="file" 
            name="cv2" 
            className='w-full'
            value={selectedFiles.cv2}
            accept='application/pdf' 
            onChange={changeHandler} 
          />  
    </form>
  )
}

export default FormCv
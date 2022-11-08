import React from 'react'
import { useState } from 'react';

const FormCv = ({onCloseModal, editableData, setIsEdited, setEditableData}) => {

  const [ selectedFiles, setSelectedFiles ] = useState("");

  const changeHandler = (event) => {
		setSelectedFiles(event.target.files[0]);
  }

  const submitEdit = (e) => {

    e.preventDefault()
  
    if(editableData.cv_1){
      setEditableData({...editableData, cv_2: selectedFiles})
    }
    else{
      setEditableData({...editableData, cv_1: selectedFiles})
    }
    setIsEdited(true)
	};
  
  return (
    <form className='ml-4'>
          <input 
            type="file" 
            name="cv1" 
            className='w-4/5'
            accept='application/pdf' 
            onChange={changeHandler} 
          />

          <div className='mt-4'>
            <button className='bg-seventh ml-2 py-1 px-2 rounded-md text-white text-[14px]' onClick={submitEdit}>
              Agregar
            </button>
            <button className='bg-sixth ml-4 py-1 px-2 rounded-md  text-[14px]' onClick={onCloseModal}>Cancelar</button>
          </div>
         
    </form>
  )
}

export default FormCv
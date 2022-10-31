import React from 'react'
import remove from '../../../../../assets/icons/eliminar.png'

const TechStack = ({tech, onHandleOpenModal}) => {
  return (
    <div className='flex flex-col py-1'>

            <div className='flex justify-center'>
                <button className='bg-eleventh w-full py-2' onClick={onHandleOpenModal}>
                    + Agregar Nuevo
                </button>
            </div>

        <div className='flex justify-between py-3 px-3'>
            <div className='flex w-full items-center'>
                <h4 className='font-bold text-primary'>React JS</h4>

                <span className='w-1/4 bg-fifth h-3 rounded-full ml-4'>
                    <p className='w-1/4 bg-sixth h-full rounded-full'></p>
                </span> <small className='text-[12px] ml-2'> Básico </small >
            </div>
            <img src={remove} alt="" className='w-7' />
        </div>

        <div className='flex justify-between py-3 px-3'>
            <div className='flex w-full items-center'>
                <h4 className='font-bold text-primary'>ASP.NET</h4>

                <span className='w-1/4 bg-fifth h-3 rounded-full ml-4'>
                    <p className='w-1/2 bg-[#D3C90D] h-full rounded-full'></p>
                </span> <small className='text-[12px] ml-2'> Intermedio </small >
            </div>
            <img src={remove} alt="" className='w-7' />
        </div>

        <div className='flex justify-between py-3 px-3'>
            <div className='flex w-full items-center'>
                <h4 className='font-bold text-primary'>Python</h4>

                <span className='w-1/4 bg-fifth h-3 rounded-full ml-4'>
                    <p className='w-3/4 bg-seventh h-full rounded-full'></p>
                </span> <small className='text-[12px] ml-2'> Avanzado </small >
            </div>
            <img src={remove} alt="" className='w-7' />
        </div>

        <div className='flex justify-between py-3 px-3'>
            <div className='flex w-full items-center'>
                <h4 className='font-bold text-primary'>Django</h4>

                <span className='w-1/4 bg-fifth h-3 rounded-full ml-4'>
                    <p className='w-full bg-secondary h-full rounded-full'></p>
                </span> <small className='text-[12px] ml-2'> Experto </small >
            </div>
                
        </div>

    </div>
  )
}

export default TechStack
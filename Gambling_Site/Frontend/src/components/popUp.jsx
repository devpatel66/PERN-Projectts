import React, { Children } from 'react'

function PopUp({content,subCotent,btnText="",btnText2="",func2,func1}){
  return (
    <div className='p-10 text-white absolute top-[30%] z-10 transition-all duration-1000 bg-gray-800 opacity-95 rounded-xl text-center '>
        <p>{content}</p>
        {subCotent && <p>{subCotent}</p>}
        <div className='flex justify-center gap-5'>
        {btnText && <button onClick={func1} className='mt-5 px-4 py-2 bg-green-600 rounded-xl'>{btnText}</button>}
        {btnText2 && <button onClick={func2} className='mt-5 px-4 py-2 bg-red-400 rounded-xl'>{btnText2}</button>}

        </div>
    </div>
  )
}

export default PopUp
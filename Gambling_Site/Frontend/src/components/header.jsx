import React from 'react'
import { useSelector } from 'react-redux'

function Header() {

    const wallet = useSelector(state=>state.wallet)
  return (
    <div className='flex h-36  justify-between w-full border-b-2 border-lime-100 py-3'>
        <div className='flex w-1/2 justify-start px-48 items-center'>
                <h1 className='text-orange-200 font-extrabold text-4xl'>Lucky</h1>
        </div>
        {wallet.amount && 
        <div className='w-1/2 flex justify-center items-center'>
                {wallet.amount && <div className='text-white font-bold flex justify-around text-xl py-5 rounded-xl bg-slate-800 w-1/5'>
                    <p className='text-green-400 '>Balance : </p>
                    <p>{wallet.amount}</p>
                </div>}
        </div>}
    </div>
  )
}

export default Header
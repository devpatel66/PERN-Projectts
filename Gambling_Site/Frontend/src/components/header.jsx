import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { user } from '../BackedIntegration/UserApi';
import { setAuthenicate,setWallet } from './store/Slice';
import { useNavigate } from 'react-router';

function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const wallet = useSelector(state=>state.wallet)
    const auth = useSelector(state=>state.authenticated)
    console.log(wallet)

    const handleLogout =async ()=>{
      const res = await user.logout();
      console.log(res)
      if(res.statusCode === 200){
          dispatch(setAuthenicate(false))
          dispatch(setWallet({}))
          navigate("/login")
      }
      else{
        alert(res.msg)
      }
    }
    
  return (
    <div className='flex h-36  justify-between w-full border-b-2 border-lime-100 py-3'>
        <div className='flex w-1/2 justify-start px-48 items-center'>
                <h1 className='text-orange-200 font-extrabold text-4xl'>Lucky</h1>
        </div>
        <div className='flex w-1/2 justify-end px-48 items-center'>
            
        {auth ?  wallet.id  ? 
        <div className='w-full flex justify-center items-center '>
                {wallet.id && <div className='text-white w-max font-bold flex justify-around items-center py-3 px-4 rounded-2xl text-xl bg-slate-800'>
                    <p className='text-green-400 text-2xl'>Balance : </p>
                    <p className='text-2xl ml-3'>{wallet.amount}</p>
                    <button  className='ml-4 bg-slate-700 border-0 text-green-400 px-4  p-2 rounded-full'>+</button>
                </div>}
        </div> : null : null}
        {
          auth ?
          
          <button onClick={handleLogout} className='bg-red-400 hover:bg-red-500 py-3 px-4 rounded-2xl text-xl'>Logout</button>
          :
          <button  className='bg-green-400 hover:bg-green-500 py-3 px-6 rounded-2xl text-xl'>Login</button>
        }
        </div>
          
    </div>
  )
}

export default Header
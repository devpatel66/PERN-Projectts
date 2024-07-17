import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { setAmount,setGrid, setWallet } from './store/Slice';
import { useSelector } from 'react-redux';
import { wallet } from '../BackedIntegration/WalletApi';
function InputPage() {
  const auth = useSelector(state=>state.authenticated)
  const walletStore = useSelector(state=>state.wallet)
  const navigate = useNavigate();
  console.log(auth)
  useEffect(()=>{
    if(auth === false){
      navigate("/login")
    }
  },[])

  const dispatch = useDispatch();
  const selectValue = useRef(null);
  const amountInput = useRef(null);
  const [error,setErrorMsg] = useState();
  
  
  const handleClick =async ()=>{

    if(!amountInput.current.value){
        amountInput.current.focus()
        setErrorMsg("Enter Your Bet Amount")
        return;
    }
    const gridCols = selectValue.current.value;
    const amt = amountInput.current.value
    if(walletStore.amount < amt){
      setErrorMsg("insufficent Amount in the Wallet")
      return;
    }
    const updatedwallet = await wallet.dedcutAmount(amt,walletStore.id);
    console.log("Wallet :",updatedwallet)
    dispatch(setWallet(updatedwallet))
    dispatch(setAmount(amt));
    dispatch(setGrid(gridCols));
    setErrorMsg(null)
    navigate("/play")
    console.log("hello");
  }
  return (
    <div className='text-white'>
      <div className=' flex justify-center flex-col items-center h-full'>
        <h2 className='text-5xl font-bold mb-5 '>Select The Level by Seeing Aukat !!!</h2>
        <div className='flex justify-evenly items-center mt-10'>
          <div className='flex flex-col gap-2'>
          <select ref={selectValue} className='text-slate-300 bg-slate-800 p-2 rounded-xl mr-5'>
            <option value={2}>Noob (2 X 2)</option>
            <option value={3}>Easy (3 X 3)</option>
            <option value={4}>Medium (4 X 4)</option>
            <option value={5}>Hard (5 X 5)</option>
          </select>
          </div>
          <div className='relative flex flex-col justify-center items-center gap-2'>
          <input ref={amountInput} className='text-slate-300 bg-slate-800 p-2 rounded-xl w-max'  type="number" name="" id="" placeholder='Enter your Wallet Amount'/>
          {error && <span className='absolute top-10 text-red-500'>{error}</span>}
          </div>
        </div>
        <button onClick={handleClick} className='px-8 py-3 my-10 bg-orange-400 rounded-xl text-2xl text-black font-semibold'>Next</button>
        <div className='flex justify-center flex-col items-center mt-10'>
            <h2 className='text-3xl font-semibold text-red-300'>Disclaimer</h2>
            <div className='text-xl'>
                <p>1. These not a real Gambling Game and we don't take any money and in any type.</p>
                <p>2. These game is just and only for enteriment purpose and no real money is innovled in these</p>
                <p>3. These is just small project. Developed by a college student after learning react</p>
                <p>4. Anything written in the content is just for enteriment and don't take it seriouly.</p>
                <p className='text-center mt-10 text-pink-300 text-2xl capitalize'>And I Hope you like these shit gambling game &#10084;</p>
            </div>
        </div>
      </div>
    </div>
  )
}

export default InputPage
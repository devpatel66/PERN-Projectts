import React, { useEffect, useRef, useState } from 'react'
import { user } from '../BackedIntegration/UserApi';
import { setAuthenicate, setWallet } from './store/Slice';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { wallet } from '../BackedIntegration/WalletApi';

function LoginPage() {

    const [loginPage, setLoginPage] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const formRef = useRef(null);
    const regRef = useRef(null);
    const handeClick = () => {
        setLoginPage(prev => !prev);
    }

    useEffect(()=>{
        const loginFormData = new FormData(formRef.current || regRef.current)
        console.log(loginFormData);
        loginFormData.append("email","")
        loginFormData.append("password","")
    },[loginPage])

    const handleLogin= async (e)=>{
        e.preventDefault();
        const formData = new FormData(formRef.current)

        const email = formData.get("email");
        const password = formData.get("password");
        try {
            const response = await user.login({email,password});
            const walletResponse = await wallet.getWallet() || {};
            if(response.statusCode === 200){
                dispatch(setWallet(walletResponse))
                dispatch(setAuthenicate(true))
                navigate("/input")
            }
            console.log(response)
        } catch (error) {
            console.log(error.message)
        }
    }

    const handleReg = async (e)=>{
        e.preventDefault();
        const formData = new FormData(regRef.current)

        const email = formData.get("email")
        const name = formData.get("name")
        const password = formData.get("password")
        // console.log(email, name, pwd)

        if(email,password,name){
            try{
                const response = await user.register({email,password,name}) 
                console.log(response)
                if(response.statusCode === 200){
                    alert("Registration Successful")
                    setLoginPage(true)
                }
                else{
                    alert(response.msg)
                }
            }
            catch(err){
                console.error(err.message)
            }
        }
        else{
            alert("fill all details")
        }
    }
    return (
        <>
            <h1 className='text-6xl font-extrabold mb-16 text-red-200'>Welcome to Lucky</h1>
            {/* Login Page */}
            {
                loginPage ? <div className='text-white w-max'>
                    <div className='flex flex-col  items-center gap-5 border border-slate-500 px-10 py-8 rounded-2xl bg-slate-950 '>

                        <form ref={formRef} className='flex flex-col items-center gap-4'>
                        <div className='flex flex-col gap-2 items-start'>
                            <label className='px-1 text-orange-200 font-semibold text-2xl '>Email </label>
                            <input type="" name="email" id="" className='bg-transparent w-80 focus:border-orange-200 outline outline-0 border border-slate-300 rounded-2xl px-3 py-2' />
                        </div>
                        <div className='flex flex-col gap-2 items-start'>
                            <label className='px-1 font-semibold text-orange-200 text-2xl '>Password </label>
                            <input type="" name="password" id="" className='bg-transparent w-80 focus:border-orange-300 outline outline-0 border border-slate-300 rounded-2xl px-3 py-2' />
                        </div>
                        <button onClick={handleLogin} className='bg-orange-400 px-6 py-2 rounded-2xl font-semibold text-xl text-center text-black'>Login</button>
                        </form>
                        <p>Don't Have Account <span onClick={handeClick} className='cursor-pointer underline underline-offset-4 text-blue-300'>Click Here!</span></p>
                    </div>
                </div>
                    :
                    // Registation form
                    <div className='text-white'>
                        <div className='flex flex-col  items-center gap-5 border border-slate-500 px-10 py-8 rounded-2xl bg-slate-950 '>

                         <form ref={regRef} className='flex flex-col items-center gap-4'>
                         <div className='flex flex-col gap-2 items-start'>
                                <label className='px-1 text-orange-200 font-semibold text-2xl '>Name </label>
                                <input type="" name="name" id="" className='bg-transparent w-80 focus:border-orange-200 outline outline-0 border border-slate-300 rounded-2xl px-3 py-2' />
                            </div>
                            <div className='flex flex-col gap-2 items-start'>
                                <label className='px-1 text-orange-200 font-semibold text-2xl '>Email </label>
                                <input type="" name="email" id="" className='bg-transparent w-80 focus:border-orange-200 outline outline-0 border border-slate-300 rounded-2xl px-3 py-2' />
                            </div>
                            <div className='flex flex-col gap-2 items-start'>
                                <label className='px-1 font-semibold text-orange-200 text-2xl '>Password </label>
                                <input type="" name="password" id="" className='bg-transparent w-80 focus:border-orange-300 outline outline-0 border border-slate-300 rounded-2xl px-3 py-2' />
                            </div>
                            <button onClick={handleReg} className='bg-orange-400 px-6 py-2 rounded-2xl font-semibold text-xl text-center text-black'>Sign Up</button>
                         </form>
                            <p>Already Registered <span onClick={handeClick} className='cursor-pointer underline underline-offset-4 text-blue-300'>Click Here!</span></p>
                        </div>
                    </div>
            }


        </>
    )
}

export default LoginPage
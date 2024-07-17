import React, { useEffect, useRef, useState } from 'react'
import { IoDiamondOutline } from "react-icons/io5";
import { FaBomb } from "react-icons/fa";
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { wallet as  walletApi } from '../BackedIntegration/WalletApi';
import PopUp from './popUp';
import { setWallet } from './store/Slice';

function Grid() {
    const dispatch  = useDispatch();
    const navigate = useNavigate();
    const amt = useSelector(state => state.amount) || 500
    const num = useSelector(state => state.gridCols) || 5
    const auth = useSelector(state => state.authenticated);
    const wallet = useSelector(state=> state.wallet)
    if (amt === 0 || num === 0) {
        navigate('/input')
    }

    const [winningAmt, setWinningAmt] = useState(1)
    const [gameOver, setGameOver] = useState(false)
    const [withdraw,setWithdraw] = useState(false)
    const [totalAmt, setTotalAmt] = useState(parseInt(amt))
    const [grid, setGrid] = useState(null)
    const [hidden, setHidden] = useState("visible")
    const [startOver, setStartOver] = useState(false)
    
    const mainGrid = useRef(null)
    const containerRef = useRef(null)
   const btnWithdraw = useRef(null) 
    const gameOverMsg = useRef(null)
   
    const gridSize = [...new Array(num * num)] 
    let randomNums = [];
    let round = 2

    function generateGrid() {
        let play;

        gridSize.forEach((value, index) => {
            let obj = {
                "value": "Diamond",
                "icon": <IoDiamondOutline size={60} />,
                "opened": false,
            }
            gridSize[index] = obj

        })

        for (let i = 0; i < num - 1; i++) {
            let random = Math.floor(Math.random() * gridSize.length + 0)
            randomNums.push(random);
            let obj = {
                "value": "Bomb",
                "icon": <FaBomb size={60} />,
                "opened": false,
            }
            gridSize[random] = obj
        }

        play = gridSize
        return play
    }

    useEffect(() => {
        if(auth === false){
            navigate("/login")
        }
        const res = generateGrid()
        setGrid(res)
        console.log(res);
        setStartOver(false)
    }, [startOver,mainGrid])

    const gridTemplateColumns = {
        gridTemplateColumns: `repeat(${num}, minmax(0, 1fr))`
    };

    function click(event) {
        event.stopPropagation();
        console.log("Click")
        console.log("Click Disable !");
    }

    const handleStartOver = (e) => {
        navigate("/input")
    }

    const handleClick = (e, index, obj) => {
        e.target.addEventListener("click",(e)=>{
            e.stopPropagation();
        })
        const newGrid = [...grid]
        newGrid[index] = { ...obj, opened: true }
        if (obj.value === "Bomb") {
            btnWithdraw.current.disabled = true
            mainGrid.current.addEventListener('click', click);
            // mainGrid.current.onclick = true;
            setGameOver(true)
            console.log("Game Over");
            
        }
        else {
            round *= 1.5
            setWinningAmt(prev => prev*round)
        }
        
        // setTotalAmt(prev => prev + winningAmt)
        setGrid(newGrid)

    }

    const handleWithdraw = (e)=>{
        console.log(e.target)
        setHidden("invisible")
        setWithdraw(true)

    }
    function onCanncel(e){
        e.preventDefault();
        console.log(mainGrid.current)
        setHidden("visible")
        console.log("conannel")
        setWithdraw(false)
    }

    const withdrawAmt= async (e)=>{
        const total = winningAmt + totalAmt
        const res = await walletApi.addAmount(total)
        if(res.statusCode === 200){
            console.log(res.data);   
            dispatch(setWallet(res.data))
            console.log("withdraw")
            navigate("/input")
        }
    }

    return (
        <>
            {
               gameOver && <PopUp content={"Game Over"} func1={handleStartOver} subCotent={"You can't able to withdraw your amount!"} btnText='Retry'/>

            }
            {
                withdraw && <PopUp func1={withdrawAmt} func2={onCanncel} content={`Your Total Amount is ${winningAmt + totalAmt}`} subCotent={"Are you sure do you want to withdraw ?"} btnText='Submit' btnText2="Cancel"/>
            }
            {/* <h1 className='text-white'>Wallet Amount : {wallet.amount || 0}</h1> */}
            <div ref={containerRef} className={`flex justify-center items-center relative mt-0  flex-col p-3 rounded-xl overflow-auto bg-gray-800 ${hidden}`}>
                
                <div className='h-full  w-max'>

                    <div style={gridTemplateColumns} ref={mainGrid} className={`grid gap-2 relative`}>

                        {grid ? grid.map((obj, index) => (
                            <div onClick={(e) => handleClick(e, index, obj)} key={index} className={`rounded-xl bg-slate-600 p-10 h-10 w-10 
                        flex justify-center ${obj.value === "Bomb" ? "text-red-400" : "text-green-400"} items-center`}>
                                {obj.opened && <p>{obj.icon}</p>}
                                {/* <p>{obj.icon}</p> */}
                            </div>
                        )) : null}
                    </div>
                </div>
            </div>
            <div className='text-white flex flex-col items-center px-5 gap-4 py-5 bg-slate-800 mt-5  rounded-xl w-[30%]'>
                <div className='flex flex-row-reverse justify-between items-center w-full px-5 py-1'>
                    <p className='text-left w-1/2 px-3'>Your Bet Amount </p>
                     <span className=' text-left text-xl w-1/2 p-1 rounded-md bg-slate-600'>{totalAmt}</span>
                </div>
                <div className='flex flex-row-reverse justify-between items-center w-full px-5 py-1'>
                    <p className='text-left w-1/2 px-3'>Your Winning Amount </p>
                     <span className='bg-slate-600 text-xl rounded-md text-left w-1/2 p-1'>{winningAmt===1?0:winningAmt}</span>
                </div>
            </div>
            <button ref={btnWithdraw}  onClick={handleWithdraw} className='bg-green-500 text-white rounded-xl px-6 py-3 text-xl mt-10'>Withdraw</button>
        </>
    )
}

export default Grid
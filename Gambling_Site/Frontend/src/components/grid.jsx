import React, { useEffect, useRef, useState } from 'react'
import { IoDiamondOutline } from "react-icons/io5";
import { FaBomb } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

function Grid() {
    const navigate = useNavigate();
    const amt = useSelector(state => state.amount)
    const num = useSelector(state => state.gridCols)
    const auth = useSelector(state => state.authenticated)

    if (amt === 0 || num === 0) {
        navigate('/input')
    }

    const [winningAmt, setWinningAmt] = useState(1)
    const [totalAmt, setTotalAmt] = useState(parseInt(amt))
    const [grid, setGrid] = useState(null)
    const [startOver, setStartOver] = useState(false)
    const mainGrid = useRef(null)
    const gameOverMsg = useRef(null)
    const gridSize = [...new Array(num * num)]
    let randomNums = [];


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
    }, [startOver])

    const gridTemplateColumns = {
        gridTemplateColumns: `repeat(${num}, minmax(0, 1fr))`
    };

    function click(event) {
        event.stopPropagation();
        console.log("Click Disable !");
    }

    const handleStartOver = (e) => {
        setStartOver(true)
        console.log("Restarted Game");
        console.log(mainGrid);
        gameOverMsg.current.className = "hidden"
        console.log(mainGrid.current);
        navigate("/")
    }

    const handleClick = (e, index, obj) => {
        const newGrid = [...grid]
        newGrid[index] = { ...obj, opened: true }
        if (obj.value === "Bomb") {
            mainGrid.current.addEventListener('click', click);
            gameOverMsg.current.className = "text-center my-5 p-5 text-wrap text-white text-xl"
            console.log(mainGrid.current);
            console.log("Game Over");
            
        }
        else {
            let round = 2
            setWinningAmt(prev => prev*round)
            setTotalAmt(prev => prev + round)
        }

        setGrid(newGrid)

    }

    return (
        <>
            <div className='hidden' ref={gameOverMsg}>
                <p>Game Over</p>
                <p>You can't able to withdrawal your prize amount</p>
                <button className='bg-slate-400 rounded-lg px-4 py-2' onClick={(e) => handleStartOver(e)}>Start Over</button>
            </div>
            <div className='flex justify-center items-center relative flex-col p-3 border overflow-auto bg-gray-800'>
                <h1 className='text-white mb-5 text-2xl'>Winning Amount : {winningAmt}</h1>
                <h1 className='text-white mb-5 text-2xl'>Total Amount : {totalAmt}</h1>
                <div className='h-full w-max'>

                    <div style={gridTemplateColumns} ref={mainGrid} className={`grid gap-4 relative`}>

                        {grid ? grid.map((obj, index) => (
                            <div onClick={(e) => handleClick(e, index, obj)} key={index} className={`bg-slate-600 p-10 h-10 w-10 
                        flex justify-center ${obj.value === "Bomb" ? "text-red-400" : "text-green-400"} items-center`}>
                                {obj.opened && <p>{obj.icon}</p>}
                                {/* <p>{obj.icon}</p> */}
                            </div>
                        )) : null}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Grid
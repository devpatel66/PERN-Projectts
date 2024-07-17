import {createSlice} from '@reduxjs/toolkit'
import { wallet } from '../../BackedIntegration/WalletApi';

const initialState = {
    gridCols : 0,
    amount : 0,
    authenticated:false,
    wallet:{}
}

export const playSlice = createSlice({
    name:"game",
    initialState,
    reducers:{
        setAmount:(state,action)=>{
            console.log(action);
            state.amount = action.payload
        },
        setGrid:(state,action)=>{
            console.log(action);
            state.gridCols = action.payload
        },
        setAuthenicate:(state,action)=>{
            // state.authenticated = !state.authenticated
            state.authenticated = action.payload;

        },
        setWallet:(state,action)=>{
            state.wallet = action.payload;
        }
    }
})

export const {setAmount,setGrid,setAuthenicate,setWallet} = playSlice.actions


export default playSlice.reducer
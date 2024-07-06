import reducer from './Slice'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
    reducer:reducer
})
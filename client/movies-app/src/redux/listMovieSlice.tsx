import { createSlice } from "@reduxjs/toolkit";



interface statusMovie{
    favs: boolean;
}


const initialState: statusMovie={
    favs: false
}


export const movieStatusSlice=createSlice({
    name: "movfav",
    initialState,
    reducers:{
        stusMov:(state, action)=>{
            const {favs} = action.payload
            state.favs = favs
        }
    }
})


export const {stusMov} = movieStatusSlice.actions

export const movFavReducer = movieStatusSlice.reducer




import { createSlice } from "@reduxjs/toolkit";


interface MovieData{
    idmovie: string
}

const initialState: MovieData={
    idmovie:""
}

export const userSliceMovie= createSlice({
    name:"movie",
    initialState,
    reducers:{
        getMovie:(state, action)=>{
            const {id} = action.payload
            state.idmovie = id;
        }
    }
})


export const {getMovie} = userSliceMovie.actions

export const moviesReducer = userSliceMovie.reducer

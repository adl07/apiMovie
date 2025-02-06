import { createSlice } from "@reduxjs/toolkit";


interface MovieData{
    idMovie: string
}

const initialState: MovieData={
    idMovie:""
}

export const userSliceMovie= createSlice({
    name:"movie",
    initialState,
    reducers:{
        getMovie:(state, action)=>{
            const {idmovie} = action.payload
            state.idMovie = idmovie;
        }
    }
})


export const {getMovie} = userSliceMovie.actions

export const userReducer = userSliceMovie.reducer

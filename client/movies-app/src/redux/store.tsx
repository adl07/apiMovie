import { configureStore } from "@reduxjs/toolkit";

import { userReducer } from "./userSlice";
import { movieStatusSlice } from "./listMovieSlice";
import { moviesReducer } from "./movieSlice";


export const store = configureStore({
    reducer:{
        user: userReducer,
        movfav: movieStatusSlice.reducer,
        getMovie: moviesReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
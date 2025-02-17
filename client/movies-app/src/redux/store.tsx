import { configureStore } from "@reduxjs/toolkit";

import { userReducer } from "./userSlice";
import { movieStatusSlice } from "./listMovieSlice";
import { userSliceMovie } from "./movieSlice";


export const store = configureStore({
    reducer:{
        user: userReducer,
        movfav: movieStatusSlice.reducer,
        getMovie: userSliceMovie.reducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
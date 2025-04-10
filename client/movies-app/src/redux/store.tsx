import { configureStore } from "@reduxjs/toolkit";

import { userReducer } from "./userSlice";
import { movFavReducer } from "./listMovieSlice";
import { moviesReducer } from "./movieSlice";
import { registerReducer } from "./registerUser";
import { planSubsReducer } from "./planMember";


export const store = configureStore({
    reducer:{
        user: userReducer,
        movfav: movFavReducer,
        movie: moviesReducer,
        register: registerReducer,
        subscription: planSubsReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
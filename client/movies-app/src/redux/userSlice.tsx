import { createSlice } from "@reduxjs/toolkit";

interface UserData {
    id: string,
    username: string
    
}

interface MovieData{
    idMovie: string
}

const initialState: UserData = {
    username: "",
    id: ""
};

const movieInitialState: MovieData={
    idMovie:""
}


export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        addUser: (state, action)=>{
            const {username} = action.payload;
            const {iduser} = action.payload;
            state.username = username;
            state.id= iduser
            
        },

        clearUser:(state, action)=>{
            state.username = ""
        }
    }
})

export const userSliceMovie=  createSlice({
    
})


export const {addUser, clearUser} = userSlice.actions;

export const userReducer = userSlice.reducer
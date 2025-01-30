import { createSlice } from "@reduxjs/toolkit";

interface UserData {
    username: string
}

const initialState: UserData = {
    username: ""
};


export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        addUser: (state, action)=>{
            const {username} = action.payload;
            state.username = username;
        },

        clearUser:(state, action)=>{
            state.username = ""
        }
    }
})


export const {addUser, clearUser} = userSlice.actions;

export const userReducer = userSlice.reducer
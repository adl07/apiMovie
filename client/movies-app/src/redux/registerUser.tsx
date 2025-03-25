import { createSlice } from "@reduxjs/toolkit";


interface DateRegister{
    email: string
    username: string
    pass: string
}


const initialState: DateRegister={
    email: "",
    username: "",
    pass: "",
}

export const dateRegisterSlice= createSlice(
    {
        name:"register",
        initialState,
        reducers:{
            getDateRegister:(state, action)=>{
                const {email} = action.payload
                const {username} = action.payload
                const {pass} = action.payload
                state.email = email
                state.username = username
                state.pass = pass
            }
        }
        
    }
)

export const {getDateRegister} = dateRegisterSlice.actions

export const registerReducer = dateRegisterSlice.reducer
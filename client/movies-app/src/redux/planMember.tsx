import { createSlice } from "@reduxjs/toolkit"



interface planResumen{
    status: boolean,
    price: string,
    plan: string
}


const initialState: planResumen={
    status: false,
    price:"",
    plan:""
}


export const planMemberReducer = createSlice({
    name: "subscription",
    initialState,
    reducers:{
        getSubscription:(state, action)=>{
            const {status} = action.payload
            const {price} = action.payload
            const {plan} = action.payload

            state.status = status
            state.price = price
            state.plan = plan
        }
    },
})


export const {getSubscription} = planMemberReducer.actions

export const planSubsReducer = planMemberReducer.reducer

import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import { RootState } from "../redux/store";

interface Props{
    children: JSX.Element
}

export default function ProtectedRoute({children}: Props){

    //const userId = useSelector((state)=> state.user.id);


    const username = useSelector((state: RootState)=> state.user.username);

    if(!username){
        console.log("hola soy uusername", username)
        return <Navigate to={"/"} replace/>
    }

    return children

}
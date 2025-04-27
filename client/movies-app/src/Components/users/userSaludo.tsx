import {useSelector } from "react-redux"
import './userSaludo.css'
import { RootState } from "../../redux/store"


const UserSaludo: React.FC =()=>{


    
    const userName = useSelector((state: RootState) => state.user.username)

    const id = useSelector((state: RootState)=> state.user.id)

    console.log(id)

    //console.log("esto recibo de username",userName)

    return(
        <div className="username">
            <h4>{userName}</h4>
        </div>
    )
}


export default UserSaludo
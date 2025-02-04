import { useSelector } from "react-redux"
import { useState } from "react"
import './userSaludo.css'


const UserSaludo: React.FC =()=>{

    
    const userName = useSelector((state) => state.user.username)

    const id = useSelector((state)=> state.user.id)

    console.log(id)

    const [userMessage, setUserMessage] = useState<boolean>(false)

    //console.log("esto recibo de username",userName)

    return(
        <div className="username">
            <h4>{userName}</h4>
        </div>
    )
}


export default UserSaludo
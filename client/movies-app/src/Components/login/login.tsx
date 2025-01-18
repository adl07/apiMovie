import React, { useState } from "react"

import UserLogin from "../users/user"

const Login: React.FC=()=>{

    const [useUser, setUseUser] = useState<string>('');

    const [usePassword, setUsePassword] = useState<string>('');

    

    const HandleValue=()=>{
        UserLogin(useUser, usePassword)
    }

    return(
        <div>
            <label>Nombre de usuario</label>
            <input 
            type="text"
            placeholder="user"
            onChange={(e)=>setUseUser(e.target.value)}
            value={useUser}/>

            <label>Password</label>
            <input 
            type="password"
            placeholder="password"
            onChange={(e)=>setUsePassword(e.target.value)}
            value={usePassword}/>   


            <button type="button" onClick={HandleValue}>Consultar</button>
        </div>
        
    )
}

export default Login
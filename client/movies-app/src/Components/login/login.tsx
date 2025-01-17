import React, { useState } from "react"

import UserLogin from "../users/user"


interface UserInfo{
    userName: string,
    pass: string
}

const Login: React.FC<{}>=()=>{

    const [useUser, setUseUser] = useState<string>('');

    const [usePassword, setUsePassword] = useState<string>('');

    const [useUserData, setUseUserData] = useState<UserInfo[]>([]);

    
    const getUser = async ({user}:{user:string})=>{
        const response = await fetch(`https://api-movies-app.vercel.app/movies/${user}`);
        const data: UserInfo[] = await response.json()
        console.log(data)
    }

    const HandleValue=()=>{
        getUser({user: useUser })
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
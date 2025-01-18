import React, { useState } from "react"

import UserLogin from "../users/user"


interface UserInfo{
    userName: string,
    pass?: string;
}

const Login: React.FC=()=>{

    const [useUser, setUseUser] = useState<string>('');
  const [usePassword, setUsePassword] = useState<string>('');
  const [useUserData, setUseUserData] = useState<UserInfo[]>([]);

  const getUser = async ({ user }: { user: string }) => {
    try {
        const response = await fetch(
          `https://api-movies-app.vercel.app/movies/auth/user?userName=${encodeURIComponent(user)}`
        );
        
        if (!response.ok) {
          throw new Error('Error en la respuesta del servidor');
        }
        
        const data: UserInfo[] = await response.json();
        return data;
      } catch (error) {
        console.error('Error al obtener usuario:', error);
        throw error;
      }
    };
  
    const HandleValue = async () => {
      try {
        const userData = await getUser({ user: useUser });
        setUseUserData(userData);
        await UserLogin(useUser, usePassword);
      } catch (error) {
        console.error('Error en HandleValue:', error);
      }
    };

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
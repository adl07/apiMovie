import React, { useState } from "react"

import UserLogin from "../users/user"

interface UserInfo {
    username: string;
    password: string;
    // Añade aquí otros campos que pueda tener tu usuario
  }

const Login: React.FC=()=>{

    const [useUser, setUseUser] = useState<string>('');

    const [usePassword, setUsePassword] = useState<string>('');

    const [userData, setUserData] = useState<UserInfo | null>(null);


    const getUser = async (username: string) => {
        try {
          const response = await fetch(`https://api-movies-app.vercel.app/movies/user?username=${encodeURIComponent(username)}`);
          if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
          }
          const data: UserInfo = await response.json();
          console.log(data)
          return data;
        } catch (error) {
          console.error('Error al obtener usuario:', error);
          throw error;
        }
      };
    
      const HandleValue = async () => {
        try {
          const user = await getUser(useUser);
          setUserData(user);
          await UserLogin(useUser, usePassword);
        } catch (error) {
          console.error('Error en HandleValue:', error);
          // Aquí puedes manejar el error, por ejemplo, mostrando un mensaje al usuario
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
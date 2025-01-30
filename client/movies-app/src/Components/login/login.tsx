import React, { useEffect, useState } from "react"
import './login.css'
import ErrorPopUp from "../error-movie/error-popUp";
import {useDispatch } from "react-redux";
import { addUser } from "../../redux/userSlice";


interface UserInfo{
    name: string;
    id: string;
};

const Login: React.FC=()=>{


    const [useUser, setUseUser] = useState<string>('');

    const [usePassword, setUsePassword] = useState<string>('');

    const [useAlert, setUseAlert] = useState<boolean>(false);

    const [useInfoUser, setUseInfo] = useState<UserInfo | null>(null);

    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const openPopup = () => setIsPopupOpen(true);

    const closePopup = () => setIsPopupOpen(false);


    const dispatch = useDispatch()

    const getUserLogin= async (user: string)=>{

        
        try {
            const req = await fetch(`https://api-movies-app.vercel.app/movies/users/${user}`);
            const data = await req.json();
            console.log(data.id)
            console.log(data.username)
            setUseInfo({name: data.username, id: data.id})
            if (data.username) {
                dispatch(addUser({ username: data.username }))
            }
            console.log('useInfo',useInfoUser)
            if(data.username === null || data.username === undefined){
                console.log('queda en false')
                setUseAlert(false)
                setIsPopupOpen(true)
            } else{
                setUseAlert(true);
                console.log(useAlert);
            }
        } catch (error) {
            console.log('Ocurrio este error', error)
        } finally{
            setUseUser('');
            setUsePassword('');
        }
    }

    useEffect(()=>{
        
    },[useUser])

    const HandleValue=()=>{
        getUserLogin(useUser)

    }

    return(
        <div className="container-form-login">
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

            <>
                {
                    useAlert ? (
                        <>
                        </>
                    ):
                    (<ErrorPopUp isOpen={isPopupOpen}>
                            <h4 className="popup-text">Error al ingresar el usuario</h4>
                            <p className="popup-text-title">Por favor corrobora los datos de la misma e intenta nuevamente</p>
                        <button onClick={closePopup} className="button-close">
                                Cerrar
                        </button>
                    </ErrorPopUp>)
                }
            </>
            
        </div>

        
        
    )
}


export default Login
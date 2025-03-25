import React, { useEffect, useState } from "react";
import Devices from "../../images/devices.png"
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getDateRegister } from "../../redux/registerUser";


const Reform: React.FC=()=>{

    const [email, setEmail] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [pass, setPass] = useState<string>("");

    const handleValue=(e: React.FormEvent)=>{
        e.preventDefault()
        try {
            dispatch(getDateRegister({email: email, username: username, pass: pass}))
            alert("Se cargaron con exito los datos")
            console.log(`tenemos como email ${email} \n tenemos como username ${username} \n tenemos como pass ${pass}`)
        } catch (error) {
            console.log(error)
            throw new Error("Hubo un fallo al realizar ingresar los datos en el reducer");
        }

        setEmail("")
        setUsername("")
        setPass("")
    }
    

    useEffect(()=>{
    },[])

    const dispatch = useDispatch()

    return (
        <div>
            <div className="container-cheeck">
            <div className="cont-paso-uno">
                <img className="devices-img" src={Devices}/>
                <span>PASO 1 DE 4</span>
                <h2>Cuenta creada.</h2>
                <h4>Usa este email y contraseña para acceder a tu cuenta:</h4>
                <form onSubmit={handleValue}>
                    <input placeholder="Email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    />
                    <input placeholder="Username"
                    value={username}
                    onChange={(e)=> setUsername(e.target.value)}
                    />
                    <input placeholder="Agrega una contraseña"
                    value={pass}
                    onChange={(e)=> setPass(e.target.value)}
                    type="password"
                    />

                <button className="btn-siguiente" type="submit">
                        <Link to={"/singup/verifyemail"}>Siguiente</Link>
                </button>
                </form>
            </div>
        </div>
        </div>
    )
}

export default Reform
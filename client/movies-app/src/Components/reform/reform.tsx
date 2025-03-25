import React, { useState } from "react";
import Devices from "../../images/devices.png"
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getDateRegister } from "../../redux/registerUser";
import FooterPage from "../footer/footer";
import Logo from "../../images/img-logo-removebg-preview.png"
import "./reform.css"




const Reform: React.FC=()=>{

    const [email, setEmail] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [pass, setPass] = useState<string>("");

    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const handleValue=(e: React.FormEvent)=>{
        e.preventDefault()
        try {
            dispatch(getDateRegister({email: email, username: username, pass: pass}))
            console.log(`tenemos como email ${email} \n tenemos como username ${username} \n tenemos como pass ${pass}`)

            setEmail("")
            setUsername("")
            setPass("")

            navigate("/singup/verifyemail")
        } catch (error) {
            console.log(error)
            throw new Error("Hubo un fallo al realizar ingresar los datos en el reducer");
        }

        
    }
    
    

    return (
            <div className="container-cheeck">
                <div className="planform-header">
                    <div className="logo">
                        <img className="img-logo-planform" src={Logo}/>
                    </div>
                    <div className="login-home">
                        <a>
                            <Link to={"/login"} className="btn-login-home">
                                <span>INICIAR SESIÓN</span>
                            </Link>
                        </a>
                    </div>
                </div>
                <img className="devices-img" src={Devices}/>
            <div className="cont-paso-uno">
                
                <span>PASO 1 DE 4</span>
                <h2>Cuenta creada.</h2>
                <h4>Usa este email y contraseña para acceder a tu cuenta:</h4>
                    <form onSubmit={handleValue} className="cont-form-register">
                        <input placeholder="Email"
                        type="text"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        />
                        <input placeholder="Username"
                        type="text"
                        value={username}
                        onChange={(e)=> setUsername(e.target.value)}
                        />
                        <input placeholder="Agrega una contraseña"
                        type="password"
                        value={pass}
                        onChange={(e)=> setPass(e.target.value)}
                        />

                        <button className="btn-siguiente" type="submit">
                            Siguiente
                        </button>
                    </form>
                </div>
                <div className="planform-footer">
                    <FooterPage/>
                </div>
            </div>
    )
}

export default Reform
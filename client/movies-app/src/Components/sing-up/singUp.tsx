import React from "react";
import Devices from "../../images/devices.png"
import './SingUp.css'
import { Link } from "react-router-dom";
import Logo from '../../images/img-logo-removebg-preview.png'
import FooterPage from "../footer/footer";


const SingUp: React.FC=()=>{
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
            <div className="contain-paso-uno">
                <span>PASO 1 DE 4</span>
                <h2>Completa la configuración de tu cuenta</h2>
                <h4>Disney+ está personalizado para ti. Crea una contraseña para comenzar a ver Disney+.</h4>
                <div className="btn-siguiente">
                    <Link to={"/singup/reform"}>Siguiente</Link>
                </div>
            </div>
            <div className="planform-footer">
                <FooterPage/>
            </div>
        </div>
    )
}

export default SingUp
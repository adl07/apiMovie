import React from "react";
import Devices from "../../images/devices.png"
import './SingUp.css'
import { Link } from "react-router-dom";

const SingUp: React.FC=()=>{
    return (
        <div className="container-cheeck">
            <div className="cont-paso-uno">
                <img className="devices-img" src={Devices}/>
                <span>PASO 1 DE 4</span>
                <h2>Completa la configuración de tu cuenta</h2>
                <h4>Disney+ está personalizado para ti. Crea una contraseña para comenzar a ver Disney+.</h4>
                <div className="btn-siguiente">
                    <Link to={"/singup/reform"}>Siguiente</Link>
                </div>
            </div>
        </div>
    )
}

export default SingUp
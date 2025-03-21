import React from "react";
import Devices from "../../images/devices.png"
import { Link } from "react-router-dom";



const Reform: React.FC=()=>{
    return (
        <div>
            <div className="container-cheeck">
            <div className="cont-paso-uno">
                <img className="devices-img" src={Devices}/>
                <span>PASO 1 DE 4</span>
                <h2>Cuenta creada.</h2>
                <h4>Usa este email y contraseña para acceder a tu cuenta:</h4>
                <input placeholder="Email"/>
                <input placeholder="Agrega una contraseña"/>
                <div className="btn-siguiente">
                    <Link to={"/singup/verifyemail"}>Siguiente</Link>
                </div>
            </div>
        </div>
        </div>
    )
}

export default Reform
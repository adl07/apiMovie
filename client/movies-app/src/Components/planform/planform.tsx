import React, { useState } from "react";
import { Link } from "react-router-dom";
import './planform.css'
import PlansCard from "../plans-card/plansCard";
import { CardPlanProps } from "../plans-card/plansCard";
import Logo from '../../images/img-logo-removebg-preview.png'
import FooterPage from "../footer/footer";


const values =[{
        plan:"Basico", 
        resolucion: 5.999, 
        price: 450, 
        quality: "720p (HD)", 
        devices: ["pc", "celular"], 
        users: 1, 
        dev_change: 1
    },
    {
        plan: "Estandar",
        resolucion: 1080,
        price: 9.999,
        quality: "1080p (Full HD)",
        devices: ["TV", "PC", "Móvil"],
        users: 2,
        dev_change: 2
    },
    {
        plan: "Premium",
        resolucion: 1080,
        price: 13.499,
        quality: "4K (Ultra HD) + HDR",
        devices: ["TV", "PC", "Móvil"],
        users: 4,
        dev_change: 6
    }
]


const Planform: React.FC=()=>{

    const [planes, setPlanes] = useState<CardPlanProps[]>(values)

    return(
        <div className="container-planform">
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
            <div className="container-planform-planes">
                <span>PASO 3 DE 4</span>
                <h1>Selecciona el plan ideal para ti</h1>
                    
                    <div className="columns-card-plans">
                        {
                            planes.map((plan, index)=>(
                                <PlansCard key={index} CardProps={plan}/>
                            ))
                        }
                    </div>
                    
                
                <span className="descrip-tyc">
                    La disponibilidad del contenido en HD (720p), Full HD (1080p), Ultra HD (4K) y HDR depende de tu servicio de internet y del dispositivo en uso. No todo el contenido está disponible en todas las resoluciones. Consulta nuestros Términos de uso para obtener más información.
                    Solo las personas que vivan contigo pueden usar tu cuenta. Puedes ver Netflix en 4 dispositivos al mismo tiempo con el plan Premium, en 2 con el plan Estándar y en 1 con el plan Básico.
                    Los eventos en vivo se incluyen en todos los planes de Netflix y contienen anuncios.
                </span>

                <div className="btn-siguiente">
                    <Link to={""}>Siguiente</Link>
                </div>
            </div>
            <div>
                <FooterPage/>
            </div>            
        </div>
    )
}


export default Planform
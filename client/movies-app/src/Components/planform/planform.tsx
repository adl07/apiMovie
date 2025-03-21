import React, { useState } from "react";
import { Link } from "react-router-dom";
import './planform.css'
import PlansCard from "../plans-card/plansCard";
import { CardPlanProps } from "../plans-card/plansCard";

const values =[{
        plan:"basico", 
        resolucion: 123, 
        price: 450, 
        quality: "buena", 
        devices: ["pc", "celular"], 
        users: 1, 
        dev_change: 1
    },
    {
        plan: "Premium",
        resolucion: 1080,
        price: 12.99,
        quality: "Full HD",
        devices: ["TV", "PC", "Móvil"],
        users: 4,
        dev_change: 2
    }
]


const Planform: React.FC=()=>{

    const [planes, setPlanes] = useState<CardPlanProps[]>(values)

    return(
        <div className="container-planform">
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
        
        </div>
    )
}


export default Planform
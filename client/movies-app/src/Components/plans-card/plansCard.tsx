import React from "react";
import './plansCard.css'

export interface CardPlanProps{
    plan:string, 
    resolucion: number, 
    price: number, 
    quality: string, 
    devices: string[], 
    users: number, 
    dev_change: number
}

interface PlansCardProps {
    CardProps: CardPlanProps; // Ahora recibe un solo objeto del tipo CardPlanProps
  }

const PlansCard: React.FC<PlansCardProps> 
=({CardProps})=>{
    return(
        <div className="container-plans-cards">
                        <div>
                            <h3>{CardProps.plan}</h3>
                            <p>{CardProps.resolucion}</p>
                        </div>
                        <div>
                            <p>Precio mensual</p>
                            <h4>{CardProps.price}</h4>
                        </div>
                        <div>
                            <p>Calidad de audio y video</p>
                            <h4>{CardProps.quality}</h4>
                        </div>
                        <div>
                            <p>Resolución</p>
                            <h4>{CardProps.resolucion}</h4>
                        </div>
                        <div>
                            <p>Dispositivos compatibles</p>
                            <h4>{CardProps.devices}</h4>
                        </div>
                        <div>
                            <p>Dispositivos del hogar en los que se puede ver Netflix al mismo tiempo</p>
                            <h4>{CardProps.users}</h4>
                        </div>
                        <div>
                            <p>Dispositivos de descarga</p>
                            <h4>{CardProps.dev_change}</h4>
                        </div>
        </div>
    )
}


export default PlansCard
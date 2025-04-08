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
    CardProps: CardPlanProps; //recibe un solo objeto del tipo CardPlanProps
  }

const PlansCard: React.FC<PlansCardProps> 
=({CardProps})=>{
    return(
            <div className="container-plans-cards">
                        <div>
                            <ul>
                                <li className="item-detail-head">
                                    <div className="item-detail-card-head">
                                        <div className="checbx-select-plan">
                                            <input className="inpt-checbx-plan"  type='checkbox'/>
                                        </div>
                                        <h3>{CardProps.plan}</h3>
                                        <p>{CardProps.resolucion}</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="item-detail-card">
                                        <h3>Precio mensual</h3>
                                        <p>${CardProps.price}</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="item-detail-card">
                                        <h3>Calidad de audio y video</h3>
                                        <p>{CardProps.quality}</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="item-detail-card">
                                        <h3>Resolución</h3>
                                        <p>{CardProps.resolucion}</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="item-detail-card">
                                        <h3>Dispositivos compatibles</h3>
                                        <p>{CardProps.devices.join(", ").toUpperCase()}</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="item-detail-card">
                                        <h3>Dispositivos del hogar en los que se puede ver Netflix al mismo tiempo</h3>
                                        <p>{CardProps.users}</p>
                                    </div>
                                </li>
                                <li>
                                    <div className="item-detail-card">
                                        <h3>Dispositivos de descarga</h3>
                                        <p>{CardProps.dev_change}</p>
                                    </div>
                                </li>
                            </ul>
                            
                        </div>
            </div>
    )
}


export default PlansCard
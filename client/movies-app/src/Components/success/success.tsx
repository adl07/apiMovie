import React from "react";
import './success.css'

interface PopupProps {
    isOpen: boolean;
    children: React.ReactNode;
    title ?: string | null ;
    }



const Success: React.FC<PopupProps> = ({isOpen, children, title}) =>{

    if(!isOpen) return null
    return(
        <div className="success-popup-overlay">
            <div className="success-popup-content">
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="80" height="80" viewBox="0 0 48 48">
                        <circle cx="28" cy="28" r="18.1" fill="#a5d6a7"></circle><path fill="none" stroke="#18193f" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M34.3,39.4c-2.9,2-6.5,3.1-10.3,3.1C13.8,42.5,5.5,34.2,5.5,24c0-4.4,1.6-8.5,4.1-11.7"></path><path fill="none" stroke="#18193f" stroke-linecap="round" stroke-linejoin="round" strokeWidth="3" d="M20.1,5.9c1.3-0.3,2.6-0.4,3.9-0.4c10.2,0,18.5,8.3,18.5,18.5c0,2.9-0.7,5.6-1.8,8"></path><polyline fill="none" stroke="#18193f" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" points="16.5,24.5 21.5,29.5 31.5,19.5"></polyline>
                    </svg>
                    {children}
            </div>
        </div>
    )
}


export default Success
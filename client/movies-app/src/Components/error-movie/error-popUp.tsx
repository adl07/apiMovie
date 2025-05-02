import React from "react";
import './error-popUp.css'


interface PopUpProps{ 
    isOpen : boolean;
    children: React.ReactNode;
}

const ErrorPopUp: React.FC<PopUpProps>=({isOpen, children})=>{


    if(!isOpen) return null
    return(
        <div className="popup-overlay">
            <div className="popup-content">
            <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    x="0px" 
                    y="0px" 
                    width="80" 
                    height="80" 
                    viewBox="0,0,256,256"
                >
                    <g fill="none" fillRule="nonzero" stroke="none" strokeWidth="none" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{ mixBlendMode: 'normal' }}>
                        <g transform="scale(5.33333,5.33333)">
                            <circle cx="28" cy="28" r="18.5" fill="#d34141" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter"></circle>
                            <path d="M35.4,38.8c-3.2,2.4 -7.1,3.9 -11.4,3.9c-10.3,0 -18.7,-8.4 -18.7,-18.7c0,-2.6 0.6,-5.2 1.5,-7.4" fill="none" stroke="#18193f" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                            <path d="M12.1,9.6c3.2,-2.6 7.4,-4.3 11.9,-4.3c10.3,0 18.7,8.4 18.7,18.7c0,2.3 -0.4,4.5 -1.2,6.6" fill="none" stroke="#18193f" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                            <path d="M31.1,16.9l-14.2,14.2" fill="none" stroke="#18193f" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                            <path d="M31.1,31.1l-14.2,-14.2" fill="none" stroke="#18193f" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"></path>
                        </g>
                    </g>
                </svg>
                    {children}
            </div>
        </div>
    
    )
}


export default ErrorPopUp
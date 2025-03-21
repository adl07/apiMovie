import React from "react";
import './singUpPlan.css'
import { Link } from "react-router-dom";



const SingUpPlan: React.FC=()=>{
    return (
        <div className="container-singup">
            <div className="container-card-plan">
                <div className="icon-cheeck">
                    <svg
                        x="0px"
                        y="0px"
                        width="25"
                        height="25"
                        viewBox="0 0 256 256"
                        fill="#000000"
                        stroke="none"
                        strokeWidth="1"
                        strokeLinecap="butt"
                        strokeLinejoin="miter"
                        fillRule="nonzero"
                        style={{ mixBlendMode: "normal" }}
                    >
                        <g transform="scale(8.53333,8.53333)">
                        <path d="M26.98047,5.99023c-0.2598,0.00774 -0.50638,0.11632 -0.6875,0.30273l-15.29297,15.29297l-6.29297,-6.29297c-0.25082,-0.26124 -0.62327,-0.36647 -0.97371,-0.27511c-0.35044,0.09136 -0.62411,0.36503 -0.71547,0.71547c-0.09136,0.35044 0.01388,0.72289 0.27511,0.97371l7,7c0.39053,0.39037 1.02353,0.39037 1.41406,0l16,-16c0.29576,-0.28749 0.38469,-0.72707 0.22393,-1.10691c-0.16075,-0.37985 -0.53821,-0.62204 -0.9505,-0.60988z"></path>
                        </g>
                    </svg>
                </div>
                <span>PASO 3 DE 4</span>
                <h1>Selecciona tu plan</h1>
                <div className="item-cheeck-plan">
                    <span>
                    <svg
                        x="0px"
                        y="0px"
                        width="25"
                        height="25"
                        viewBox="0 0 256 256"
                        fill="#000000"
                        stroke="none"
                        strokeWidth="1"
                        strokeLinecap="butt"
                        strokeLinejoin="miter"
                        fillRule="nonzero"
                        style={{ mixBlendMode: "normal" }}
                    >
                        <g transform="scale(8.53333,8.53333)">
                        <path d="M26.98047,5.99023c-0.2598,0.00774 -0.50638,0.11632 -0.6875,0.30273l-15.29297,15.29297l-6.29297,-6.29297c-0.25082,-0.26124 -0.62327,-0.36647 -0.97371,-0.27511c-0.35044,0.09136 -0.62411,0.36503 -0.71547,0.71547c-0.09136,0.35044 0.01388,0.72289 0.27511,0.97371l7,7c0.39053,0.39037 1.02353,0.39037 1.41406,0l16,-16c0.29576,-0.28749 0.38469,-0.72707 0.22393,-1.10691c-0.16075,-0.37985 -0.53821,-0.62204 -0.9505,-0.60988z"></path>
                        </g>
                    </svg>
                    </span>
                    <p>Sin compromisos, cancela cuando quieras.</p>
                </div>
                <div className="item-cheeck-plan">
                    <span>
                    <svg
                        x="0px"
                        y="0px"
                        width="25"
                        height="25"
                        viewBox="0 0 256 256"
                        fill="#000000"
                        stroke="none"
                        strokeWidth="1"
                        strokeLinecap="butt"
                        strokeLinejoin="miter"
                        fillRule="nonzero"
                        style={{ mixBlendMode: "normal" }}
                    >
                        <g transform="scale(8.53333,8.53333)">
                        <path d="M26.98047,5.99023c-0.2598,0.00774 -0.50638,0.11632 -0.6875,0.30273l-15.29297,15.29297l-6.29297,-6.29297c-0.25082,-0.26124 -0.62327,-0.36647 -0.97371,-0.27511c-0.35044,0.09136 -0.62411,0.36503 -0.71547,0.71547c-0.09136,0.35044 0.01388,0.72289 0.27511,0.97371l7,7c0.39053,0.39037 1.02353,0.39037 1.41406,0l16,-16c0.29576,-0.28749 0.38469,-0.72707 0.22393,-1.10691c-0.16075,-0.37985 -0.53821,-0.62204 -0.9505,-0.60988z"></path>
                        </g>
                    </svg>
                    </span>
                    <p>Todo Netflix a un bajo costo.</p>
                </div>
                <div className="item-cheeck-plan">
                    <span>
                    <svg
                        x="0px"
                        y="0px"
                        width="25"
                        height="25"
                        viewBox="0 0 256 256"
                        fill="#000000"
                        stroke="none"
                        strokeWidth="1"
                        strokeLinecap="butt"
                        strokeLinejoin="miter"
                        fillRule="nonzero"
                        style={{ mixBlendMode: "normal" }}
                    >
                        <g transform="scale(8.53333,8.53333)">
                        <path d="M26.98047,5.99023c-0.2598,0.00774 -0.50638,0.11632 -0.6875,0.30273l-15.29297,15.29297l-6.29297,-6.29297c-0.25082,-0.26124 -0.62327,-0.36647 -0.97371,-0.27511c-0.35044,0.09136 -0.62411,0.36503 -0.71547,0.71547c-0.09136,0.35044 0.01388,0.72289 0.27511,0.97371l7,7c0.39053,0.39037 1.02353,0.39037 1.41406,0l16,-16c0.29576,-0.28749 0.38469,-0.72707 0.22393,-1.10691c-0.16075,-0.37985 -0.53821,-0.62204 -0.9505,-0.60988z"></path>
                        </g>
                    </svg>
                    </span>
                    <p>Disfruta sin límites en todos tus dispositivos.</p>
                </div>

                <div className="btn-siguiente">
                    <Link to={"/singup/planform"}>Siguiente</Link>
                </div>
            </div>
        </div>
    )
}

export default SingUpPlan
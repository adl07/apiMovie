import React from "react"
import { Link } from "react-router-dom"
import './verifyEmail.css'
import { useSelector } from "react-redux"
import FooterPage from "../footer/footer"
import Devices from "../../images/devices.png"
import Logo from "../../images/img-logo-removebg-preview.png"





const VerifyEmail: React.FC=()=>{

    const emailUser = useSelector((state)=>state?.register.email)

    console.log('desde verifyEmail', emailUser)

    return(
        <div className="container-verify">
            <div className="verify-header">
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
            <div className="container-verify-email" >
                <div className="icon-cheeck">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        role="img"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        data-icon="ShieldCheckmarkStandard"
                        aria-hidden="true"
                        >
                        <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12.4061 1.08619C12.1476 0.971271 11.8524 0.971271 11.5939 1.08619L1.59387 5.53063C1.21945 5.69704 0.984428 6.07501 1.0008 6.48441C1.11201 9.2645 1.36208 12.7774 2.80051 15.8916C4.26941 19.0717 6.95244 21.7837 11.7603 22.9708C11.9177 23.0097 12.0823 23.0097 12.2397 22.9708C17.0476 21.7837 19.7306 19.0717 21.1995 15.8916C22.6379 12.7774 22.888 9.2645 22.9992 6.48441C23.0156 6.07501 22.7806 5.69704 22.4061 5.53063L12.4061 1.08619ZM4.61617 15.0529C3.46121 12.5525 3.15696 9.68464 3.02915 7.08136L12 3.09432L20.9709 7.08136C20.8431 9.68464 20.5388 12.5525 19.3838 15.0529C18.1819 17.6551 16.0369 19.9059 12 20.968C7.96307 19.9059 5.81813 17.6551 4.61617 15.0529ZM11.7071 15.7071L17.7071 9.70711L16.2929 8.29289L11 13.5858L8.70711 11.2929L7.29289 12.7071L10.2929 15.7071L11 16.4142L11.7071 15.7071Z"
                        fill="currentColor"
                        />
                    </svg>
                </div>
                <span>PASO 2 DE 4</span>
                <h1>Exelente ahora verifiquemos tu email</h1>
                <h4>Haz clic en el enlace que enviamos a <span className="email-user">{emailUser}</span> para completar la verificación.
                    Al verificar tu email, podrás mejorar la seguridad de la cuenta y recibir comunicaciones importantes de Disney+.</h4>
                <div className="btn-siguiente">
                    <Link to={"/singup/plan"}>Omitir</Link>
                </div>
            </div>
            <div className="planform-footer">
                <FooterPage/>
            </div>  
        </div>
    )

}

export default VerifyEmail
import React from "react"
import './footer.css'
import Logo from '../../images/img-logo-removebg-preview.png'


const FooterPage: React.FC=()=>{
    return(
            <div className="container-footer">
                <img src={Logo} />
                <div className="priv-help">
                    <button>Privacy Policy</button>
                    <button>Disney Terms of Use</button>
                    <button>Cookies Policy</button>
                    <button>Subscriber Agreement</button>
                    <button>Help</button>
                </div>
                <div className="sup-dev">
                    <button>Supported Devices</button>
                    <button>About Us</button>
                    <button>Interest-based Ads</button>
                </div>
                <div className="">
                    <button className="cancel-subs">Cancelar Subscription</button>
                </div>
                <div className="subs-serv">
                    <p>Disney+ is a paid subscription service; its content is subject to availability. The Disney+ service is marketed by The Walt Disney Company (Argentina) S.A., Tucumán 1, Piso 4º (C1049AAA) Autonomous City of Buenos Aires, Argentina and CUIT number 30-63984459-1</p>
                </div>
                <div className="copyright">
                    <p>© Disney. All rights reserved.</p>
                </div>
            </div>
    )
}


export default FooterPage
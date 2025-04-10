import { Link } from 'react-router-dom'
import FooterPage from '../footer/footer'
import Logo from '../../images/img-logo-removebg-preview.png'
import './paymentPicker.css'

export const PaymentPicker=()=>{
    return(
        <div className='container-payment'>
            <div className='header-payment'>
                <div className="logo">
                    <img src={Logo} className="img-logo-payment"/>
                </div>
                <div className="login-home">
                    <a>
                        <Link to={"/login"} className="btn-login-home">
                            <span>INICIAR SESION</span>
                        </Link>
                    </a>
                </div>
            </div>
            <div className="content-payment">
                
            </div>

            <div className='footer-payment'>
                <FooterPage/>
            </div>
        </div>
    )
}


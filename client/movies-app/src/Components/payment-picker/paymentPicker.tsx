import { Link, useNavigate } from 'react-router-dom'
import FooterPage from '../footer/footer'
import Logo from '../../images/img-logo-removebg-preview.png'
import './paymentPicker.css'
import { PaySummary } from '../paysummary/paySummary'
import {useSelector } from 'react-redux'
import { alert } from '@material-tailwind/react'
import Success from '../success/success'
import { useState } from 'react'
import { RootState } from '../../redux/store'

export const PaymentPicker=()=>{

    

    const emailRegister = useSelector((state: RootState)=> state.register.email)
    const userRegister = useSelector((state: RootState)=> state.register.username)
    const idPlan = useSelector((state: RootState)=> state.subscription.plan);
    const pricePlan = useSelector((state: RootState)=> state.subscription.price);
    const password = useSelector((state: RootState)=> state.register.pass);
    const navigate = useNavigate()
    const [isSubscription, setIsSubscription] = useState<boolean>(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);


    const closePopup = () => setIsPopupOpen(false);

    const redirectLogin=()=>{
        navigate('/login')
    }

    const sendDataNewUser= async()=>{
            const props = {
                    username: userRegister, 
                    email:emailRegister,
                    subscripcion: idPlan, 
                    password: password, 
                } 
            console.log(props)
            try {
                const res = await fetch('https://api-movies-app.vercel.app/movies/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(props)
                    
                })
                if(res.ok){
                    console.log("Se genero subscripcion con exito")
                    setIsSubscription(true)
                    setIsPopupOpen(true);
                    
                } else{
                    const errorData = await res.json();
                    console.error("Error en el servidor:", errorData)
                }
            } catch (error) {
                console.log("Error al generar la subscripcion", error)
                throw new Error("Error al generar la subscripcion");
            }
        }
    

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
                <PaySummary 
                    plan = {idPlan}
                    price={pricePlan}
                    email={emailRegister}
                    username={userRegister}
                    send={sendDataNewUser}
                />
            </div>
            {isSubscription ?
                <Success isOpen={isPopupOpen}>
                <h4 className="popup-text">Subscripcion completada!</h4>
                <p className="popup-text-title">Ya podés acceder a tu perfil</p>
            
                <div className="popup-buttons">
                    <button className="button-accept" onClick={redirectLogin}>
                        Iniciar Sesion
                    </button>
                    <button onClick={closePopup} className="button-close">
                        Cerrar
                    </button>
                </div>
            </Success>:
                <div></div>
            }
            <div className='footer-payment'>
                <FooterPage/>
            </div>
        </div>
    )
}


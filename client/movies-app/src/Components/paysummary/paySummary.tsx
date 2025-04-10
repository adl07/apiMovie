import React from "react";
import './paySummary.css'

interface payValues{
    plan: string,
    price: string,
    email: string,
    username:string
}


export const PaySummary: React.FC<payValues>=({plan, price, email, username})=>{
    return(
        <div className="cont-form-summary">
            <span>PASO 4 DE 4</span> 
            
            <h2>Configura tu tarjeta de crédito o débito</h2>
            <div className="card-pay">
                <img src="https://assets.nflxext.com/siteui/acquisition/payment/ffe/paymentpicker/VISA.png" alt="Visa" className="logoIcon VISA default-ltr-cache-kg1rox e18ygst00"  data-uia="logoIcon-VISA"/>
                <img src="https://assets.nflxext.com/siteui/acquisition/payment/ffe/paymentpicker/MASTERCARD.png" alt="Mastercard" className="logoIcon MASTERCARD default-ltr-cache-kg1rox e18ygst00" data-uia="logoIcon-MASTERCARD"></img>
                <img src="https://assets.nflxext.com/siteui/acquisition/payment/ffe/paymentpicker/AMEX.png" alt="American Express" className="logoIcon AMEX default-ltr-cache-kg1rox e18ygst00" data-uia="logoIcon-AMEX"></img>
            </div>
            <div className="card-inputs">
                <input  
                    className="input-card-number"
                    placeholder="Número de tarjeta"/>
                <div className="inputs-fecven">
                    <input placeholder="Fecha de vencimiento"/>
                    <input placeholder="CVV"/>
                </div>
                    <input 
                    className="input-name-card" 
                    placeholder="Nombre de la tarjeta"/>
            </div>

            <div>
                <p>${price} al mes (sin impuestos incluidos)</p>
                <p>{plan}</p>
            </div>
            <div className="date-register">
                <p>Recibiras la notificacion al correo <strong>{email}</strong> , es con el que registraste tu membresia </p>
                <p>Recorda iniciar sesion con tu user <strong>{username}</strong></p>
            </div>
            <p className="copyright">Al hacer clic en el botón «Iniciar membresía», aceptas nuestros Términos de uso y nuestra Declaración de privacidad, y declaras que tienes más de 18 años. Asimismo, entiendes que Netflix continuará tu membresía de manera automática y, hasta que la canceles, te facturará el cargo mensual (actualmente de $ {price} al mes + impuestos aplicables) a través de la forma de pago elegida. Puedes cancelar la membresía en cualquier momento para evitar cargos en el futuro. Para cancelarla, ve a Cuenta y haz clic en «Cancelar membresía».</p>

            <div>
                <button className="btn-iniciar-memb">Iniciar membresia</button>
            </div>
        </div>
    )
}

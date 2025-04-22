import React,{useEffect, useState} from "react";
import { cardCreditProps, type CardCreditType } from "../../schemas/cardCred";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useFormik } from "formik";
import './paySummary.css'

interface payValues{
    plan: string,
    price: string,
    email: string,
    username:string,
    send: ()=> void
}


export const PaySummary: React.FC<payValues>=({plan, price, email, username, send})=>{

    const [isDisable, setIsDisable] = useState<boolean>(true)

    
    const formik = useFormik<CardCreditType>({
            initialValues:{
                numberCard: "",
                fecVencCard: "",
                cvvCard: "",
                userCard:"",
            },
                validationSchema: toFormikValidationSchema(cardCreditProps),
            onSubmit:(values, {resetForm}) =>{
                //setIsDisable(false) 
                try {
                    /*dispatch(getDateRegister({
                            email: values.email, 
                            username: values.username, 
                            pass: values.password
                    }))*/
                    console.log(`tenemos como card number ${values.numberCard} \n tenemos como card user ${values.userCard} 
                        \n tenemos como cvv ${values.cvvCard}  \n tenemos como fecha venc ${values.fecVencCard}`)
                    console.log("Formulario enviado:", values)
                    //reseteo los campos
                    resetForm()
                    //navigate("/singup/verifyemail")
                } catch (error) {
                    console.log(error)
                    throw new Error("Hubo un fallo al realizar ingresar los datos");
                }
            }
        })

        useEffect(()=>{
                if(Object.keys(formik.errors).length === 0 && 
                    Object.values(formik.values).every(value => value !== "")
                ){
                    setIsDisable(false)
                } else{
                    setIsDisable(true)
                }
            },[formik.errors, formik.values])

    return(
        <div className="cont-form-summary">
            <span>PASO 4 DE 4</span> 
            
            <h2>Configura tu tarjeta de crédito o débito</h2>
            <div className="card-pay">
                <img src="https://assets.nflxext.com/siteui/acquisition/payment/ffe/paymentpicker/VISA.png" alt="Visa" className="logoIcon VISA default-ltr-cache-kg1rox e18ygst00"  data-uia="logoIcon-VISA"/>
                <img src="https://assets.nflxext.com/siteui/acquisition/payment/ffe/paymentpicker/MASTERCARD.png" alt="Mastercard" className="logoIcon MASTERCARD default-ltr-cache-kg1rox e18ygst00" data-uia="logoIcon-MASTERCARD"></img>
                <img src="https://assets.nflxext.com/siteui/acquisition/payment/ffe/paymentpicker/AMEX.png" alt="American Express" className="logoIcon AMEX default-ltr-cache-kg1rox e18ygst00" data-uia="logoIcon-AMEX"></img>
            </div>

            {/*Agrego form de formik */}

            <form onSubmit={formik.handleSubmit} className="card-inputs">
                        <div className="container-input-card-number">
                                <input 
                                    placeholder="Número de tarjeta"
                                    id="numberCard"
                                    name="numberCard"
                                    type="text"
                                    value={formik.values.numberCard}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="input-card-number"
                                    autoComplete="off"
                                />
                                <p className="text-xs text-red-500 h-5">
                                    {formik.touched.numberCard && formik.errors.numberCard ? formik.errors.numberCard : ''}
                                </p>
                        </div>
                        

                        <div className="inputs-fecven">
                            <div className="container-input-fecvenc">
                                <input 
                                    placeholder="Fecha de vencimiento"
                                    id="fecVencCard"
                                    name="fecVencCard"
                                    type="text"
                                    value={formik.values.fecVencCard}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="input-fec-venc"
                                    autoComplete="off"
                                />
                                <p className="text-xs text-red-500 h-5">
                                    {formik.touched.fecVencCard && formik.errors.fecVencCard ? formik.errors.fecVencCard : ''}
                                </p>
                            </div>
                            <div className="container-input-cvv">
                                <input placeholder="CVV"
                                    id="cvvCard"
                                    name="cvvCard"
                                    type="text"
                                    value={formik.values.cvvCard}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="input-cvv"
                                    autoComplete="off"
                                />
                                <p className="text-xs text-red-500 h-2">
                                    {formik.touched.cvvCard && formik.errors.cvvCard ? formik.errors.cvvCard : ''}
                                </p>
                            </div>
                        </div>
                        <div className="container-input-name-card">
                            <input placeholder="Nombre de la tarjeta"
                                id="userCard"
                                name="userCard"
                                type="userCard"
                                value={formik.values.userCard}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="input-name-card"
                                autoComplete="off"
                            />
                            <p className="text-xs text-red-500 h-5">
                                {formik.touched.userCard && formik.errors.userCard ? formik.errors.userCard : ''}
                            </p>
                        </div>
                        
                        {/*
                        <button className={isDisable ? 'btn-siguiente-disable' : 'btn-siguiente'} type="submit">
                            Siguiente
                        </button>
                         */}

                    <div className="descrip-price">
                        <span>${price} al mes (sin impuestos incluidos)</span>
                        <p>{plan}</p>
                    </div>
                    <div className="date-register">
                        <p>Recibiras la notificacion al correo <strong>{email}</strong> , es con el que registraste tu membresia.</p>
                        <p>Recorda iniciar sesion con tu user <strong>{username}</strong></p>
                    </div>
                <p className="copyright">Al hacer clic en el botón «Iniciar membresía», aceptas nuestros Términos de uso y nuestra Declaración de privacidad, y declaras que tienes más de 18 años. Asimismo, entiendes que Netflix continuará tu membresía de manera automática y, hasta que la canceles, te facturará el cargo mensual (actualmente de $ {price} al mes + impuestos aplicables) a través de la forma de pago elegida. Puedes cancelar la membresía en cualquier momento para evitar cargos en el futuro. Para cancelarla, ve a Cuenta y haz clic en «Cancelar membresía».</p>

                <button className={isDisable ? 'btn-iniciar-memb-disable' : 'btn-iniciar-memb'} type="submit" onClick={send}>Iniciar membresia</button>
            </form>

            {/*Fin formik form */}
            
        </div>
    )
}

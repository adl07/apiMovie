import React , {useEffect} from "react";
import Devices from "../../images/devices.png"
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getDateRegister } from "../../redux/registerUser";
import FooterPage from "../footer/footer";
import Logo from "../../images/img-logo-removebg-preview.png"
import { useFormik} from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { registerLoginUser, type RegisterLoginUserType } from "../../schemas/login";
import "./reform.css"



function Reform(){

    const dispatch = useDispatch()
    const navigate = useNavigate()


    const formik = useFormik<RegisterLoginUserType>({
        initialValues:{
            username: "",
            email:"",
            password: "",
        },
            validationSchema: toFormikValidationSchema(registerLoginUser),
            
        onSubmit:(values, {resetForm}) =>{
            try {
                dispatch(getDateRegister
                    ({
                    email: values.email, 
                    username: values.username, 
                    pass: values.password
                    })
                )
                console.log(`tenemos como email ${values.email} \n tenemos como username ${values.username} \n tenemos como pass ${values.password}`)
                console.log("Formulario enviado:", values)
                console.log(registerLoginUser);
                //reseteo los campos
                resetForm()
                navigate("/singup/verifyemail")
            } catch (error) {
                console.log(error)
                throw new Error("Hubo un fallo al realizar ingresar los datos en el reducer");
            }
        }
    })

    
    
    return (
            <div className="container-cheeck">
                <div className="planform-header">
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
            <div className="cont-paso-uno">
                
                <span>PASO 1 DE 4</span>
                <h2>Cuenta creada.</h2>
                <h4>Usa este email y contraseña para acceder a tu cuenta:</h4>
                    <form onSubmit={formik.handleSubmit} className="cont-form-register">
                        <input placeholder="Email"
                            id="email"
                            name="email"
                            type="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            
                        />
                        {formik.touched.email && formik.errors.email && (
                            <p className="text-sm text-red-500">{formik.errors.email}</p>
                        )}
                        <input placeholder="Username"
                            id="username"
                            name="username"
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        
                        />
                        {formik.touched.username && formik.errors.username && (
                            <p className="text-sm text-red-500">{formik.errors.username}</p>
                        )}
                        <input placeholder="Agrega una contraseña"
                            id="password"
                            name="password"
                            type="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            
                        />
                        {formik.touched.password && formik.errors.password && (
                            <p className="text-sm text-red-500">{formik.errors.password}</p>
                        )}
                        <button className="btn-siguiente" type="submit">
                            Siguiente
                        </button>
                    </form>
                </div>
                <div className="planform-footer">
                    <FooterPage/>
                </div>
            </div>
    )
}

export default Reform
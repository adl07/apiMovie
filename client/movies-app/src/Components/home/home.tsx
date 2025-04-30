import './home.css'
import Logo from '../../images/Logo.png';
import { useState } from 'react';
import {Carousel} from "@material-tailwind/react"
import { Link} from 'react-router-dom';


const imgBgrHome: string[] = ["bgHomeOne", "bgHomeTwo", "bgHomeThree"]

export default function Home(){

    const [currentPage, setCurrentPage] = useState(0);
    const [useImage, setUseImage] = useState<string>(imgBgrHome[0]);


    return( 
            <main>
                <div className={`container-home ${useImage} transition-bg`}>
                    <div className='container-login'>
                        <Link to="/login" className="btn-login-home-user">
                                INICIAR SESIÓN
                        </Link>
                    </div>
                    <div className='lorem-home'>
                                <img src={Logo} alt="" className="logo-img"/>
                                <h1>Hay un nuevo Disney+</h1>
                                <h3>Donde todo se encuentra</h3>
                                <ul className='descrip-subs'>
                                    <li>
                                        <div className="btn-sub-estd">
                                            <Link to={"/singup"}>
                                                Estandar
                                            </Link>
                                        </div>
                                        <p>Estándar incluye series, películas y una selección de canales de ESPN (ESPN e ESPN3).</p>
                                    </li>
                                    <li>
                                        <div className='btn-sub-prem'>
                                            <Link to={"/singup"}>Premium</Link>
                                        </div>
                                        <p>Premium incluye series, películas, todos los canales básicos de ESPN, torneos y más de 500 eventos exclusivos por mes.</p>
                                    </li>
                                </ul>
                                
                    </div>
                    <Carousel
                        className="rounded-xl"
                        autoplay={false}
                        loop={false}
                        prevArrow={() => null}
                        nextArrow={() => null}
                        navigation={({ setActiveIndex, activeIndex, length }) => (
                        <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-0.5">
                            {Array.from({ length }).map((_, i) => (
                            <span
                                key={i}
                                className={`block h-0.5 cursor-pointer transition-all ${
                                activeIndex === i ? "w-32 bg-white" : "w-32 bg-white/50"
                                }`}
                                onClick={() => {
                                setActiveIndex(i);
                                setCurrentPage(i);
                                setUseImage(imgBgrHome[i]);
                                }}
                            />
                            ))}
                            
                        </div>
                        )}
                        placeholder="" // 
                        onPointerEnterCapture={() => {}} 
                        onPointerLeaveCapture={() => {}}
                    >   
                        <div className="h-full w-full bg-cover bg-center">
                        </div>
                        <div className="h-full w-full bg-cover bg-center">
                        </div>
                        <div className="h-full w-full bg-cover bg-center">
                        </div>
                    </Carousel>
                </div>
            </main>
    )
}
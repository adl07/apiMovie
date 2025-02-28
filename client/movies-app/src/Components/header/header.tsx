import './header.css'
import Logo from '../../images/img-logo-removebg-preview.png'
import Avatar from '../../images/scale-removebg-preview.png'
import { useSelector } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";


export default function Header(){

    const userName = useSelector((state)=>state?.user.username)

    console.log('desde home login', userName)

    const idUser = useSelector((state)=>state?.user.id)

    console.log('desde home login', idUser)

    const [useActHover, setActHover] = useState<boolean>(false);

    
    return(
        <header className="container-header">
            <nav>
                <div className="nav-comand">
                    <div className="nav-options">
                        <a href="http://localhost:5173/">
                            <img src={Logo} className="logo-nav"/>
                        </a>
                        <ul>
                            <li>
                                <a>
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="21" height="21" viewBox="0,0,256,256">
                                            <g fill="#fff" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none"><g transform="scale(5.33333,5.33333)"><path d="M39.5,43h-9c-1.381,0 -2.5,-1.119 -2.5,-2.5v-9c0,-1.105 -0.895,-2 -2,-2h-4c-1.105,0 -2,0.895 -2,2v9c0,1.381 -1.119,2.5 -2.5,2.5h-9c-1.381,0 -2.5,-1.119 -2.5,-2.5v-19.087c0,-2.299 1.054,-4.471 2.859,-5.893l14.212,-11.199c0.545,-0.428 1.313,-0.428 1.857,0l14.214,11.199c1.805,1.422 2.858,3.593 2.858,5.891v19.089c0,1.381 -1.119,2.5 -2.5,2.5z"></path></g></g>
                                        </svg>
                                    </span>
                                    <p>HOME</p>
                                </a>
                            </li>
                            <li>
                                <a>
                                    
                                        <span>
                                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 48 48">
                                                <g fill="#fff" >
                                                <path d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z"></path>
                                                </g>
                                            </svg>
                                        </span>
                                        <p>SEARCH</p>
                                </a>
                                
                            </li>
                            <li>
                                <a>
                                <Link to={`/userFav/${idUser}`}>
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 24 24">
                                        <g fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round">
                                            <line x1="12" y1="3" x2="12" y2="21"/>
                                            <line x1="3" y1="12" x2="21" y2="12"/>
                                        </g>
                                        </svg>
                                    </span>
                                    <p>WATCHLIST</p>
                                    </Link>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className={`options-user ${useActHover ? "options-user-active":""}`}
                        onMouseEnter={()=>setActHover(true)}
                        onMouseLeave={()=>setActHover(false)}
                    >
                        <ul>
                            <li className="user-profile">
                                <p>{userName}</p>
                                <img src={Avatar} className="avatar-user"/>
                            </li>
                            <div className="bar"></div>
                            <div className="account-settings">
                                <li>
                                    <p>Cuenta</p>
                                </li>
                                <li>
                                    <p>Cerrar Sesion</p>
                                </li>
                            </div>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}
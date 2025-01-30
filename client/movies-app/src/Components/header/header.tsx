import { Link } from "react-router-dom"
import './header.css'
import Logo from '../../images/Logo.png'
import { useSelector } from "react-redux"

export default function Header(){

    const userName = useSelector((state)=>state.user.username)

    return(
        <header>
            <div>
                <img src={Logo} alt="" className="logo-img"/>
            </div>
            <div className="username">
                <h5>Hola {userName}</h5>
            </div>
            <div>
                <Link to="/">Home</Link>
                <Link to="/searchMovie">Search</Link>
                <Link to="/createMovie">Create</Link>
                <Link to="/updateMovie">Update</Link>
                <Link to="/deleteMovie">Delete</Link>
                <Link to="/login">Login</Link>
            </div>
        </header>
    )
}
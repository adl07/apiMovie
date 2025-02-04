import { Link } from "react-router-dom"
import './header.css'
import Logo from '../../images/Logo.png'
import UserSaludo from "../users/userSaludo"

export default function Header(){

    return(
        <header>
            <div>
                <img src={Logo} alt="" className="logo-img"/>
            </div>
            <div>
                <UserSaludo/>
            </div>
            <div>
                <Link to="/">Home</Link>
                <Link to="/searchMovie">Search</Link>
                <Link to="/createMovie">Create</Link>
                <Link to="/updateMovie">Update</Link>
                <Link to="/deleteMovie">Delete</Link>
                <Link to="/login">Login</Link>
                <Link to="/userFav">My Movies</Link>
            </div>
        </header>
    )
}
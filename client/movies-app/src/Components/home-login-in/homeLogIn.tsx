import React from "react";
import './homeLogIn.css'
import AllMovies from "../all/allMovies";
import Header from "../header/header";
import FooterPage from "../footer/footer";
import useResponsive from '../../hooks/useResponsive';
import Logo from '../../images/img-logo-removebg-preview.png'




const HomeLogIn: React.FC=()=>{
    
    const isResponsive = useResponsive(390);


    return(
        <div className="container-home">
            {isResponsive ? 
            <div className="contain-logo-respons">
                <img src={Logo} className="logo-responsive"/>
            </div> : 
            <Header/>}
            
            <section className="carrousel-card">
                <AllMovies/>
            </section>
            <div>

            </div>
            <footer>
                {isResponsive ? <Header/> :  <FooterPage/>}
            </footer>
        </div>
    )
}


export default HomeLogIn
import React from "react";
import './homeLogIn.css'
import AllMovies from "../all/allMovies";
import Header from "../header/header";
import FooterPage from "../footer/footer";
import useResponsive from '../../hooks/useResponsive';




const HomeLogIn: React.FC=()=>{
    
    const isResponsive = useResponsive(390);


    return(
        <div className="container-home">
            <Header/>
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
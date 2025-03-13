import React from "react";
import './homeLogIn.css'
import AllMovies from "../all/allMovies";
import Header from "../header/header";
import FooterPage from "../footer/footer";





const HomeLogIn: React.FC=()=>{
    

    return(
        <div className="container-home">
            <Header/>
            <section className="carrousel-card">
                <AllMovies/>
            </section>
            <footer>
                <FooterPage/>
            </footer>
        </div>
    )
}


export default HomeLogIn
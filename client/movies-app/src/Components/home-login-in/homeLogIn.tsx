import React from "react";
import './homeLogIn.css'
import AllMovies from "../all/allMovies";
import Header from "../header/header";





const HomeLogIn: React.FC=()=>{
    

    return(
        <div className="containerHome">
            <Header/>
            <section className="carrousel-card">
                <AllMovies/>
            </section>
        </div>
    )
}


export default HomeLogIn
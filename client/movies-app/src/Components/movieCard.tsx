import { useDispatch } from "react-redux";
import { Movie } from "./movie";
import './movieCard.css'
import { useEffect } from "react";
import { getMovie } from "../redux/movieSlice";
import { useAppSelector } from "../hooks/hooks";


type Props = Movie;


/*
const addMovieList= async ()=>{
    try {
        const response = await fetch('http://localhost:1234/movies/movieList',{
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify(idUser,idMovie )
        });

        if (response.ok) {
            const result = await response.json();
            console.log('Película agregada con éxito:', result)
        } else{
            console.error('Error al agregar la película a la lista:', response.statusText);
        }  
    } catch (error) {
        console.log("Error al agregar pelicula a la lista", error)
    }
}

*/



export default function MovieCard({id, title, poster, director,duration}:Props){

    const dispatch = useDispatch()
    

    const idUser = useAppSelector((state)=> state.user.id);

    let idMovie: string = id
    idMovie = useAppSelector((state)=> state.movie?.id?? id)
    

    useEffect(()=>{
        dispatch(getMovie({idmovie:id}))
            console.log("Id del usuario",idUser)
            console.log("Id de la pelicula",idMovie)
    },[dispatch, id])

    return(
        <div id={id} className="movie-card">
            <h2>{title}</h2>
            <img className="img-movie" src={poster} />
                <p>{director}</p>
                <p>{duration}</p>   
            <button type="button">Agregar a favoritos</button>
        </div>
    )
}




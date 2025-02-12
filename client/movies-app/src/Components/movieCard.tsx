import { useDispatch } from "react-redux";
import { Movie } from "./movie";
import './movieCard.css'
import { useEffect } from "react";
import { getMovie } from "../redux/movieSlice";
import { useAppSelector } from "../hooks/hooks";


type Props = Movie;



export default function MovieCard({id, title, poster, director,duration}:Props){


    const dispatch = useDispatch()
    
    const idUser = useAppSelector((state)=> state.user.id);

    const idMovie = useAppSelector((state)=> state.movie?.id?? id)
    

    useEffect(()=>{
        dispatch(getMovie({idmovie:id}))
            console.log("Id del usuario",idUser)
            console.log("Id de la pelicula",idMovie)
    },[dispatch, id])


    const addMovieList= async ()=>{
        try {
            const response = await fetch('https://api-movies-app.vercel.app/movies/movieList',{
                method: 'POST',
                headers: {
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({idUser,idMovie })
                
            });
            console.log("Id movie y idUser que se le envia",idUser, idMovie)

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

    const removeMovieList= async()=>{
        try {
            //ya tengo un endpoint que recibe el id del user para retornar sus peliculas, lo que necesito para este caso es
            //tener el id de la pelicular para modificar el estado de fav/favs
            const response = await fetch(`https://api-movies-app.vercel.app/movies/movieList/${idMovie}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ favs: false })
              });

              if (response.ok) {
                const result = await response.json();
                console.log('Película quita con éxito:', result)
            } else{
                console.error('Error al quitar la película a la lista:', response.statusText);
            }  
        } catch (error) {
            console.log("Error al quitar pelicula a la lista", error)
        }
    }   

    return(
        <div id={id} className="movie-card">
            <h2>{title}</h2>
            <img className="img-movie" src={poster} />
                <p>{director}</p>
                <p>{duration}</p>   
            <button type="button" onClick={addMovieList}>Agregar a favoritos</button>
            <button type="button" onClick={removeMovieList}>Quitar de la lista de favoritos</button>
        </div>
    )
}




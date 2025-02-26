import { useDispatch } from "react-redux";
import { Movie } from "./movie";
import './movieCard.css'
import { useEffect } from "react";
import { getMovie } from "../redux/movieSlice";
import { useAppSelector } from "../hooks/hooks";


type Props = Movie;

export const removeMovieList= async(idUser:string, idMovie:string): Promise<boolean>=>{
    try {
        const response = await fetch('https://api-movies-app.vercel.app/movies/updateFav', {
            method: 'PATCH',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({idUser,idMovie})
        });

        console.log(response)
        if (response.ok) {
            const result = await response.json();
            console.log('Película quita con éxito:', result)
            return true
        } else{
            console.error('Error al quitar la película a la lista:', response.statusText);
        }  
    } catch (error) {
        console.log("Error al quitar pelicula a la lista", error)
        return false
    }
}   


export const addMovieList= async (idUser:string, idMovie:string): Promise<boolean>=>{
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
            console.log(result)
            if(result === false){
                return false
            } else {
                return true
            }
            
        } else{
            console.error('Error al agregar la película a la lista:', response.statusText);
            return false
        }  
    } catch (error) {
        console.log("Error al agregar pelicula a la lista", error)
        return false
    }
}


export default function MovieCard({id, title, poster, director,duration}:Props){


    const dispatch = useDispatch()
    
    const idUser = useAppSelector((state)=> state.user.id);

    const idMovie = useAppSelector((state)=> state.getMovie.idmovie?? id);

    const favStus = useAppSelector((state)=> state.movfav?.favs);



    useEffect(()=>{
        dispatch(getMovie({idmovie:id}))
            console.log("Id del usuario",idUser)
            console.log("Id de la pelicula",idMovie)
            //console.log('reportando status desde moviecard', favStus)
    },[dispatch, id])


    
    

    return(
        <div id={id} className="movie-card">
            <h2>{title}</h2>
            <img className="img-movie" src={poster} />
                <p>{director}</p>
                <p>{duration}</p>
        </div>
    )
}




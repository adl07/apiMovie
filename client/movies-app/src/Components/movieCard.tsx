import { useDispatch } from "react-redux";
import { Movie } from "./movie";
import './movieCard.css'
import { useEffect } from "react";
import { getMovie } from "../redux/movieSlice";
import { useAppSelector } from "../hooks/hooks";
import { RootState } from "../redux/store";


type Props = Movie;

const API_URL = import.meta.env.VITE_API_URL;


export const removeMovieList = async(idUser:string, idMovie:string): Promise<boolean>=>{
    try {
        console.log("Enviando request con credentials include");
        // Obtener el token de la respuesta de login que guardaste
        const token = localStorage.getItem('token');

        const response = await fetch(`${API_URL}/movies/updateFav`, {
            credentials:'include',
            method: 'PATCH',
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({idUser,idMovie})
        });

        console.log(response.status)

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


export const addMovieList = async (idUser:string, idMovie:string): Promise<boolean>=>{
    try {
        
        console.log("Enviando request con credentials include");
        // Obtener el token de la respuesta de login que guardaste
        const token = localStorage.getItem('token');

        const response = await fetch(`${API_URL}/movies/movieList`,{
            credentials:'include',
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({idUser,idMovie })
            
        });
        console.log("Id movie y idUser que se le envia",idUser, idMovie)
        console.log("Estado de la respuesta:", response.status);

        if (response.ok) {
            const result = await response.json();
            console.log(result)
            return result !== false;
            
        } else{
            console.error('Error al agregar la película a la lista:', response.statusText);
            return false
        }  
    } catch (error) {
        console.log("Error al agregar pelicula a la lista", error)
        return false
    }
}


export default function MovieCard({id, title, poster, director,duration,year,rate,public: pub,genre}:Props){


    const dispatch = useDispatch()
    
    const idUser = useAppSelector((state: RootState)=> state.user.id);

    const idMovie = useAppSelector((state: RootState)=> state.movie.idmovie);

    const favStus = useAppSelector((state: RootState)=> state.movfav?.favs);



    useEffect(()=>{
        dispatch(getMovie({id:id}))
            console.log("Id del usuario",idUser)
            console.log("Id de la pelicula",idMovie)
            //console.log('reportando status desde moviecard', favStus)
    },[dispatch, id, idUser, idMovie])


    
    

    return(
        <div id={id} className="movie-card">
            
            <img className="img-movie" src={poster} />
            <div className="detail-movie">
                <span>{title}</span>
                <div className="items-movie-detail" >
                    <p className="item-public">{pub}</p>
                    <p>{year}</p>
                    <p>{rate}</p>
                </div>
            </div> 
        </div>
    )
}




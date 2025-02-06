import { useSelector } from "react-redux";
import { Movie } from "./movie";
import './movieCard.css'

type Props = Movie;

const idUser = useSelector((state)=> state.user.id);

console.log(idUser)


const addMovieList=()=>{
    try {
        const response = fetch('http://localhost:1234/movies/movieList',{
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify()
        })
    } catch (error) {
        
    }
}

export default function MovieCard({id, title, poster, director,duration}:Props){
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

import { Movie } from "./movie";
import './movieCard.css'

type Props = Movie;

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

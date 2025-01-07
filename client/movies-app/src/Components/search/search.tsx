import { useState } from "react"
import { Movie } from "../movie";
import MovieList from "../movieList";
import './search.css'




export default function SearchId(){

    const [stateIdValue, setIdValue] = useState<string>('');

    const [stateInfo, setInfo] = useState<Movie[]>([]);

    const [useLoading, setUseLoading] = useState<boolean>(false);

    const getMovieId = async ({id}:{id:string})=>{
        const response = await fetch(`https://api-movies-app.vercel.app/movies/${id}`);
        const data:Movie[]  = await response.json();
        setUseLoading(true);
        setInfo(data)

        console.log(data)
    }
    const handleValue=()=>{
        getMovieId({id: stateIdValue})
    }

    return(
        <div className="contianer-card-movie">
            <div className="card-search">
                <span>Busca tu pelicula por el id 🍿</span>
                <input 
                type="text" 
                placeholder="Ingrese Id..."
                value={stateIdValue}
                onChange={(e)=> setIdValue(e.target.value)}
                />
                <button className="btn-custom-buscar" onClick={()=>handleValue()}>Buscar</button>
            </div>
            {
                useLoading ? (
                    <MovieList Mov={stateInfo}/>
                ):
                <div>
                    <h4>No hay busquedas...</h4>
                </div>
            }
        </div>
    )
}



import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MovieCard from "../movieCard";
import './userFav.css'
import { stusMov } from "../../redux/listMovieSlice";
import { useAppSelector } from "../../hooks/hooks";
import { removeMovieList } from "../movieCard";


interface MoviesProps{
    id: string,
    title: string ,
    year: number,
    director: string,
    duration: number,
    poster: string,
    rate: number,
    iduser?: string ,
    fav: boolean
}

const UserFavMovies: React.FC<{idUser:string}>=({idUser})=>{

    idUser = useSelector((state)=>state.user.id)

    const userName = useSelector((state) => state.user.username)

    const favStus = useAppSelector((state)=> state.movfav?.favs);

    const dispatch = useDispatch()

    //const [favStates, setFavState] = useState<boolean>();

    const [useMovFav, setMovFav] = useState<MoviesProps[]>([])

    //console.log(idUser)
    //console.log(userName)
    //console.log(favStus)

    console.log('info usemovfav',useMovFav)

    useEffect(()=>{
        const getMoviesFav = async ()=>{
        try {
            const response = await fetch(`https://api-movies-app.vercel.app/movies/userid/${idUser}`);
            if (!response.ok) {
                throw new Error("Error al llamar a la api")
            }
            const data = await response.json();
            setMovFav(data)
            console.log('get movies',data)

            const favstate = data[0]?.favs[0].favs;

            dispatch(stusMov({favs: favstate}))
            
            console.log('fav state',favstate);

        } catch (error) {
            console.log(error)
            throw new Error("Error al obtener las peliculas favoritas del usuario");
            
        }
    }

    getMoviesFav()

    },[idUser])

    const successRemoveMovie = async(user:string, movieId:string)=>{
        const remove = await removeMovieList(user, movieId);
        if(remove){
            setMovFav((setPrevMov)=> setPrevMov.filter(movie => movie.id !== movieId))
        }
    }

    return(
        <div className="container-movie">
            {
                useMovFav.length > 0 ?  
                (useMovFav.map((mov)=>(
                    <div key={mov.id}>
                        <MovieCard
                        id={mov.id}
                        title={mov.title}
                        poster={mov.poster}
                        director={mov.director}
                        duration={mov.duration}
                        />
                        <button type="button" onClick={async () =>successRemoveMovie(idUser, mov.id)}>Eliminar de la lista de favoritos</button>
                    </div>
                    
                ))):
                (<div>
                    <h2>No hay peliculas en la lista</h2>
                </div>)
                
            }
        </div>
    )
}


export default UserFavMovies
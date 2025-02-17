
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MovieCard from "../movieCard";
import './userFav.css'
import { stusMov } from "../../redux/listMovieSlice";
import { useAppSelector } from "../../hooks/hooks";


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

    console.log(idUser)
    console.log(userName)
    

    

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

    

    return(
        <div className="container-movie">
            {
                useMovFav.map((mov)=>(
                    <div key={mov.id}>
                        <MovieCard
                        id={mov.id}
                        title={mov.title}
                        poster={mov.poster}
                        director={mov.director}
                        duration={mov.duration}
                        />

                {  
                    favStus? 
                    (<button type="button">Quitar de la lista de favoritos</button> )
                    :(<button type="button" >Agregar a favoritos</button>)
                }
                    </div>
                    
                ))
            }
        </div>
    )
}


export default UserFavMovies
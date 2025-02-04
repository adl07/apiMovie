
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MovieCard from "../movieCard";
import './userFav.css'


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
            console.log(data)
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
                    </div>
                    
                ))
            }
        </div>
    )
}


export default UserFavMovies

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MovieCard from "../movieCard";
import './userFav.css'
import { stusMov } from "../../redux/listMovieSlice";
import { useAppSelector } from "../../hooks/hooks";
import { removeMovieList } from "../movieCard";
import Header from "../header/header";
import FooterPage from "../footer/footer";
import { ThreeDots } from "react-loader-spinner";
import { RootState } from "../../redux/store";
import useResponsive from "../../hooks/useResponsive";
import Success from "../success/success";


interface MoviesProps{
    id: string,
    title: string ,
    year: number,
    director: string,
    duration: number,
    poster: string,
    rate: number | string,
    iduser?: string,
    public?: string,
    fav: boolean
}

const UserFavMovies: React.FC=()=>{

    const idUser = useSelector((state: RootState)=>state.user.id)

    const userName = useSelector((state: RootState) => state.user.username)

    const favStus = useAppSelector((state: RootState)=> state.movfav?.favs);

    const [isLoading, setIsLoading] = useState<boolean>(true)

    const [isPopupOpenSuccess, setPopupOpenSucces] = useState(false)
    const [useStatusAdd, setStatusAdd]= useState<boolean>(false);

    const closePopup = () => {
        setPopupOpenSucces(false);
        setStatusAdd(null);
    }

    const dispatch = useDispatch()

    const [useMovFav, setMovFav] = useState<MoviesProps[]>([])

    const isResponsive = useResponsive(400)

    //console.log(idUser)
    //console.log(userName)
    //console.log(favStus)

    console.log('info usemovfav',useMovFav)

    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(()=>{
        const getMoviesFav = async ()=>{
            setIsLoading(true)
        try {
            const token = localStorage.getItem('token')
            const response = await fetch(`${API_URL}/movies/userid/${idUser}`,{
                credentials:"include",
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
                
            });
            console.log("valor de API_URL desde userFav.tsx", `${API_URL}/movies/userid/${idUser}`)
            console.log("api response",response)
            if (!response.ok) {
                throw new Error("Error al llamar a la api")
                
            }
            
            const data = await response.json();
            console.log("respuesta de la data api", data)
            setMovFav(data)
            const favstate = data[0]?.favs[0].favs;
            dispatch(stusMov({favs: favstate}))
            
            console.log('fav state',favstate);

        } catch (error) {
            console.log(error)
            throw new Error("Error al obtener las peliculas favoritas del usuario");
            
        }finally {
            setIsLoading(false)
        }
    }

    if(idUser){  // esto es clave, sino idUser puede venir undefined al principio
        getMoviesFav()
    }

    },[idUser])



    const successRemoveMovie = async(user:string, movieId:string)=>{
        const remove = await removeMovieList(user, movieId);
        if(remove){
            setMovFav((setPrevMov)=> setPrevMov.filter(movie => movie.id !== movieId))
            setStatusAdd(true)
            setPopupOpenSucces(true)
        }
    }



    return(
        <>
        <div className="container-movies-favs">
            {isResponsive ? <div></div> : <Header/>}
            
            <h1>Whatchlist</h1>
            <div className="grid-movies">
                {
                    isLoading ?
                    (
                        <div className="loader-movies">
                            <ThreeDots
                            visible={true}
                            height="80"
                            width="80"
                            color="#4fa94d"
                            radius="9"
                            ariaLabel="three-dots-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                            />
                        </div>
                    ): 
                    (
                        useMovFav.length > 0 ?  
                        (useMovFav.map((mov)=>(
                        <div key={mov.id}>
                            <MovieCard
                            id={mov.id}
                            title={mov.title}
                            poster={mov.poster}
                            director={mov.director}
                            duration={mov.duration}
                            year={mov.year}
                            rate={parseFloat(String(mov.rate)).toFixed(1)}
                            public={mov.public}
                            />
                            <button className="btn-remove-movie-list" type="button" onClick={async () =>successRemoveMovie(idUser, mov.id)}>Eliminar de la lista de favoritos</button>
                        </div>
                        
                        )))
                        :
                        (<div className="dialog-notmovie">
                            <h2>No hay peliculas en la lista</h2>
                        </div>)
                    )
                }
            </div>
            
            <footer>
                {isResponsive ? <Header/> : <FooterPage/>}
            </footer>
        </div>
            { useStatusAdd ? (
                <Success isOpen={isPopupOpenSuccess}>
                    <h4 className="success-popup-text">¡Película eliminada de tu lista!</h4>
                    <button onClick={closePopup} className="success-button-close-success">
                    Cerrar
                    </button>
                </Success>
                ) : null}
            
        </>
        
    )
}


export default UserFavMovies
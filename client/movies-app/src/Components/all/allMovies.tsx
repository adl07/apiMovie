import { useEffect, useState } from "react"
import { Movie } from "../movie"
import MovieCard from "../movieCard";
import './allMovies.css'
import {ThreeDots} from 'react-loader-spinner'
import { useAppSelector } from "../../hooks/hooks";
import { addMovieList } from "../movieCard";
import ErrorPopUp from "../error-movie/error-popUp";




export default function AllMovies(){


    const [useAllMovies, setAllMovies] = useState<Movie[]>([]);

    const [useStatusAdd, setStatusAdd]= useState<boolean>(false);

    const [useLoading, setUseLoading] = useState<boolean>(false);

    const idUser = useAppSelector((state)=> state.user.id);

    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const openPopup = () => setIsPopupOpen(true);

    const closePopup = () => setIsPopupOpen(false);



      useEffect(()=>{
        const getData = async () => {
          try {
            const response = await fetch('https://api-movies-app.vercel.app/movies',{
              credentials: "include"
            }); // URL de la API
            const data: Movie[] = await response.json(); // Convertir respuesta a JSON
            setAllMovies(data); // Guardar los datos en el estado
            setUseLoading(true);
            console.log(data); // Confirmar que los datos llegaron
          } catch (error) {
            console.error('Error al obtener las películas:', error);
          }
        }

        getData()
      },[])


      const successAddMovieList = async(user:string, movieId:string)=>{
              const addMovie = await addMovieList(user, movieId);
              if(addMovie !== true){
                setStatusAdd(false)
                setIsPopupOpen(true)
                console.log('valor de setStatusAdd', addMovie)
              }
          }
    

      useEffect(() => {
      console.log("isPopupOpen cambió:", isPopupOpen);
      }, [isPopupOpen]);


    return(
        <div className="container-movies">
          <div className="container-allmovies-card">
          {
              useLoading ? (
                useAllMovies.map((mov, index)=>(
                  <div key={index} className="container-card">
                      <MovieCard 
                      id={mov.id}
                      poster={mov.poster}
                      />

                    <button type="button" onClick={()=>successAddMovieList(idUser, mov.id)}>Agregar a favoritos</button>

                    {!useStatusAdd && (
                        <ErrorPopUp isOpen={isPopupOpen}>
                            <h4 className="popup-text">Actualmente ya se encuentra la pelicula en la lista</h4>
                            <p className="popup-text-title">Por favor corrobora tu lista e intenta nuevamente</p>
                            <button onClick={closePopup} className="button-close">
                                Cerrar
                            </button>
                        </ErrorPopUp>
                    )}
                  </div>

              ))
              ):
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
            }
          </div>  
        </div>
    )
}
import { useEffect, useState } from "react"
import { Movie } from "../movie"
import MovieCard from "../movieCard";
import './allMovies.css'
import {ThreeDots} from 'react-loader-spinner'
import { useAppSelector } from "../../hooks/hooks";
import { addMovieList } from "../movieCard";
import ErrorPopUp from "../error-movie/error-popUp";
import Success from "../success/success";




export default function AllMovies(){


    const [useAllMovies, setAllMovies] = useState<Movie[]>([]);

    const [useStatusAdd, setStatusAdd]= useState<boolean>(false);

    const [useLoading, setUseLoading] = useState<boolean>(false);

    const idUser = useAppSelector((state)=> state.user.id);

    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const [isPopupOpenSuccess, setPopupOpenSucces] = useState(false)

    const openPopup = () => setIsPopupOpen(true);

    const closePopup = () => {
      setIsPopupOpen(false);
      setStatusAdd(null);
    }
    

    const API_URL = import.meta.env.VITE_API_URL || "/api";

    console.log('API_URL:', API_URL);

      useEffect(()=>{
        const getData = async () => {
          try {
             // Obtener el token de la respuesta de login que guardaste
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/movies`,{
              credentials: "include",
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
                }
            }); // URL de la API
            console.log(`Fetching from: ${API_URL}`);
            console.log('API_URL:', API_URL);
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
              console.log('valor de setStatusAdd', addMovie)
              if(!addMovie){
                setStatusAdd(false)
                setIsPopupOpen(true)
                
              } else{
                setStatusAdd(true)
                setPopupOpenSucces(true)
                setIsPopupOpen(true)
                
              }
          }
    

      useEffect(() => {
      console.log("isPopupOpen cambió:", isPopupOpen);
      }, [isPopupOpen]);


    return(
      <>
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

                      <button type="button" onClick={()=>successAddMovieList(idUser, mov.id)}>
                        <div className="btn-add-watchlist">
                              WATCHLIST
                              <svg className="svg-watchlist" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="18" height="18" viewBox="0 0 24 24">
                                          <g fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round">
                                              <line x1="12" y1="3" x2="12" y2="21"/>
                                              <line x1="3" y1="12" x2="21" y2="12"/>
                                          </g>
                              </svg>
                        </div>
                      </button>
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
          {useStatusAdd ?  (
                          <Success isOpen={isPopupOpenSuccess}>
                          <h4 className="success-popup-text">Pelicula agregada a tu lista!</h4>
                          <button onClick={closePopup} className="success-button-close-success">
                            Cerrar
                            </button>
                          </Success>
                      ) : (
                        <ErrorPopUp isOpen={isPopupOpen}>
                              <h4 className="popup-text">Actualmente ya se encuentra la pelicula en la lista</h4>
                              <p className="popup-text-title">Por favor corrobora tu lista e intenta nuevamente</p>
                              <button onClick={closePopup} className="button-close">
                                  Cerrar
                              </button>
                          </ErrorPopUp>
                      )}
      </>
        
    )
}
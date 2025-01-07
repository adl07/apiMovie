import { useEffect, useState } from "react"
import { Movie } from "../movie"
import MovieCard from "../movieCard";
import './allMovies.css'
import {ThreeDots} from 'react-loader-spinner'




export default function AllMovies(){


    const [useAllMovies, setAllMovies] = useState<Movie[]>([]);

    const [useLoading, setUseLoading] = useState<boolean>(false);

    

    const getData = async () => {
        try {
          const response = await fetch('https://api-movies-app.vercel.app/movies'); // URL de la API
          const data: Movie[] = await response.json(); // Convertir respuesta a JSON
          setAllMovies(data); // Guardar los datos en el estado
          setUseLoading(true);
          console.log(data); // Confirmar que los datos llegaron
        } catch (error) {
          console.error('Error al obtener las películas:', error);
        }
      };


      useEffect(()=>{
        getData()
      },[])

    return(
        <div className="container">  
            {
              useLoading ? (
                useAllMovies.map((mov, index)=>(
                  <div key={index} className="container-card">
                      <MovieCard 
                      id={mov.id}
                      poster={mov.poster}
                      title={mov.title}
                      director={mov.director}
                      duration={mov.duration}
                      />
                  </div>
                  
              ))
              ): <ThreeDots
                visible={true}
                height="80"
                width="80"
                color="#4fa94d"
                radius="9"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            }
            
        </div>
    )
}
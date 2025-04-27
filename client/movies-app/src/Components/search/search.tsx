import { useEffect, useState } from "react"
import { Movie } from "../movie";
import './search.css'
import Header from "../header/header";
import FooterPage from "../footer/footer";
import MovieCard from "../movieCard";
import { ThreeDots } from "react-loader-spinner";


const API_URL = import.meta.env.VITE_API_URL;

export default function SearchId(){

    const [stateIdValue, setIdValue] = useState<string>('');

    const [allMovies, setAllMovies] = useState<Movie[]>([]);

    const [filterMovies, setFilterMovies] = useState<Movie[]>([]);

    const [useLoading, setUseLoading] = useState<boolean>(false);


    useEffect(()=>{
        const fetchMoviesTitle = async()=>{

            setUseLoading(true)
            try {
                const response = await fetch(`${API_URL}/movies`,{
                    credentials:"include"
                });
                const data:Movie[]  = await response.json();
                setAllMovies(data)
                setFilterMovies(data)
                console.log(data)
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
    
            setUseLoading(false);
        }
        fetchMoviesTitle();
    },[])
    

    //const filterMovies = stateInfo.filter((movie)=> movie.title?.toLocaleLowerCase().includes(stateIdValue.toLocaleLowerCase()))

    useEffect(()=>{
        const delaySearch = setTimeout(()=>{
            if(!stateIdValue.trim()){
                setFilterMovies(allMovies); //si no se ingresan caracteres se muestran todas las movies
            } else{
                setFilterMovies(
                    allMovies.filter((movie)=> movie.title.toLowerCase().includes(stateIdValue.toLowerCase()))
                )
            }
        }, 500)

        return ()=> clearTimeout(delaySearch)
    },[stateIdValue, allMovies])

    return(
        <div className="contianer-movies-search">
            <Header/>
            <div className="card-search">
                <input 
                type="text" 
                placeholder="Que vemos hoy?...🍿"
                value={stateIdValue}
                onChange={(e)=> setIdValue(e.target.value)}
                />
                
            </div>

            <div className="contain-mov-card-result">
                {useLoading ? (
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
                ) : filterMovies.length > 0 ? (
                    <div className="container-movs-filter">
                        {
                            filterMovies.map((mov, index)=>(
                                <MovieCard 
                                id={mov.id}
                                poster={mov.poster}
                                title={mov.title}
                                director={mov.director}
                                duration={mov.duration}
                                year={mov.year}
                                rate={parseFloat(String(mov.rate)).toFixed(1)}
                                public={mov.public}
                                />))
                        }
                    </div>
                ) : (
                    <div className="not-found-mov">
                        <span>{`No hay resultados para "${stateIdValue}"`}</span>
                    </div>
                )
                }
            </div>
            <footer>
                <FooterPage/>
            </footer>
        </div>
    )
}




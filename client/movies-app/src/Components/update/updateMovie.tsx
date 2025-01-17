import { FormEvent, useEffect, useState} from "react"
import { Movie } from "../movie"
import './updateMovie.css'
import Success from "../success/success";
import {ThreeDots} from 'react-loader-spinner'


type DateMovie={
    title ? : string | null ,
    year ?:number | null ,
    duration ?: number | null,
    director ?: string | null,
    poster?: string | null,
    genre ?: [] | null,
    
}

export default function UpdateMovie(){

    const [useDataMovie, setUseDataMovie] = useState<Movie | null>(null);

    const [useId, setUseId]= useState<string>('')

    const [useTitle, setUseTitle]= useState<string>("")

    const [useYear, setUseYear]= useState<string>("") 

    const [useDuration, setUseDuration]= useState<string>("") 

    const [useDirector, setUseDirector]= useState<string>("")
   
    const [usePoster, setUsePoster]= useState<string>("")

    const [useGenre, setUseGenre]= useState<string>("") 

    const [useSuccess, setUseSuccess]= useState<boolean>(false);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const openPopup = () => setIsPopupOpen(true);

    const closePopup = () => setIsPopupOpen(false);

    const getMovieId= async ({id}:{id:string})=>{
        const response = await fetch(`https://api-movies-app.vercel.app/movies/${id}`)
        const data = await response.json()

        setUseDataMovie(data)

        console.log(data)
    }

    const handleId=()=>{
        getMovieId({id: useId})
    }


    /*useEffect(() => {
            return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            };
        }, []);
    */

    useEffect(() => {
        console.log('useDataMovie:', useDataMovie);
    }, [useDataMovie]);



    const sendData= async (event: FormEvent<HTMLFormElement>)=>{
            event.preventDefault()
            setIsLoading(true); 
            // Convierte el género en un array (puedes dividir por comas si es necesario)
            const genreArray = useGenre ? useGenre.split(',').map((g) => g.trim()) : [];
    
            const data: Partial<DateMovie> = {};
            if (useTitle) data.title = useTitle;
            if (useYear) data.year = parseInt(useYear);
            if (useDuration) data.duration = parseInt(useDuration);
            if (useDirector) data.director = useDirector;
            if (usePoster) data.poster = usePoster;
            if (useGenre) data.genre = genreArray;

            console.log('Datos a enviar:', data); // Depuración

             // Realiza el POST al endpoint
            try {
                const response = await fetch(`https://api-movies-app.vercel.app/movies/${useId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data), // Convierte el objeto `data` a JSON
                });
    
                if (response.ok) {
                const result = await response.json();
                console.log('Película actualizada con éxito:', result);
                setUseDataMovie(result); // Actualiza con la nueva información
                setUseSuccess(true);
                // Limpiar cualquier timeout existente
                /*if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                }*/
                
                // Configurar el nuevo timeout para ocultar el mensaje después de 10 segundos
                /*timeoutRef.current = setTimeout(() => {
                    setUseSuccess(false);
                }, 5000);*/

                } else {
                console.error('Error al agregar la película:', response.statusText);
                }
            } catch (error) {
                console.error('Hubo un error con el PATCH:', error);
                setUseSuccess(false);
            }   
            finally {
                setIsLoading(false);
                setUseId("");
                setUseTitle("");
                setUseYear("");
                setUseDuration("");
                setUseDirector("");
                setUseGenre("");
                setUsePoster("");

            }
    }
    return(
        <div className="container-form-search">
            <div className="form-buscar">
                <label>ID de la Pelicula</label>
                <input type="text"
                placeholder="idPelicula"
                onChange={(e)=>setUseId(e.target.value)}
                value={useId}/>

                <button className="btn-custom-buscar" onClick={handleId}>Buscar</button>
            </div> 
            {
                useDataMovie && (
                    <div>
                        <h2>{useDataMovie.title}</h2>

                        <form onSubmit={sendData} className="containerForm">
                            <label>Titulo</label>
                            <input 
                            type="text" 
                            placeholder="title"
                            onChange={(e)=>setUseTitle(e.target.value)}
                            value={useTitle}
                            />

                            <label>Año</label>
                            <input 
                            type="text" 
                            placeholder="year"
                            onChange={(e)=>setUseYear(e.target.value)}
                            value={useYear}/>

                            <label>Duracion</label>
                            <input 
                            type="text" 
                            placeholder="duration"
                            onChange={(e)=>setUseDuration(e.target.value)}
                            value={useDuration}/>

                            <label>Director</label>
                            <input 
                            type="text" 
                            placeholder="director"
                            onChange={(e)=>setUseDirector(e.target.value)}
                            value={useDirector}/>
                            
                            <label>Genero</label>
                            <input 
                            type="text" 
                            placeholder="genero"
                            onChange={(e)=>setUseGenre(e.target.value)}
                            value={useGenre}/>
                            
                            <label>Poster</label>
                            <input 
                            type="text" 
                            placeholder="poster"
                            onChange={(e)=>setUsePoster(e.target.value)}
                            value={usePoster}/>
                            
                            <button className="btn-custom-actualizar"  disabled={isLoading} type='submit' onClick={openPopup}>
                                Actualizar
                            </button>

                            {isLoading ? (
                                        <div className="loading-overlay">
                                            <ThreeDots
                                            visible={true}
                                            height="80"
                                            width="80"
                                            color="#4fa94d"
                                            radius="9"
                                            ariaLabel="three-dots-loading"
                                            wrapperStyle={{}}
                                            wrapperClass="loader-update"
                                        />
                                        </div>
                                    ) : useSuccess ? (
                                        <Success isOpen={isPopupOpen} title={useTitle}>
                                            <h4 className="popup-text">Actualizado!</h4>
                                            <p className="popup-text-title">Actualizaste con exito la pelicula</p>
                                            <button onClick={closePopup} className="button-close">
                                                Cerrar
                                            </button>
                                        </Success>
                                    ) : null}
                        </form>
                    </div>
                )
            }
            
        </div>
    )
}
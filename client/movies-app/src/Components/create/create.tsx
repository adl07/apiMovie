
import { FormEvent, useState } from 'react'
import './create.css'
import Success from '../success/success';
import {ThreeDots} from 'react-loader-spinner'
import ErrorPopUp from '../error-movie/error-popUp';



type DateMovie={
    title: string,
    year:number,
    duration: number,
    director: string,
    poster: string,
    genre: string[],
    
}


export default function CreateMovie(){

    const [useTitle, setUseTitle]= useState<string>("")

    const [useYear, setUseYear]= useState<string>("") //int

    const [useDuration, setUseDuration]= useState<string>("") //int

    const [useDirector, setUseDirector]= useState<string>("")
   
    const [usePoster, setUsePoster]= useState<string>("")

    const [useGenre, setUseGenre]= useState<string>("") 

    const [useGetData, setUseGetData] = useState<DateMovie[]>([])

    const [useSuccess, setUseSuccess]= useState<boolean>(false);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const openPopup = () => setIsPopupOpen(true);

    const closePopup = () => setIsPopupOpen(false);

    
    


    

    const sendData= async (event: FormEvent<HTMLFormElement>)=>{
        event.preventDefault()

        setIsLoading(true);
        // Convierte el género en un array (puedes dividir por comas si es necesario)
        const genreArray = useGenre.split(',').map((g) => g.trim()); // Divide por comas y elimina espacios adicionales

        const data: DateMovie={
            title: useTitle,
            year: parseInt(useYear),
            duration: parseInt(useDuration),
            director:useDirector,
            poster: usePoster,
            genre: genreArray,
        }

         // Realiza el POST al endpoint
        try {
            const response = await fetch('https://api-movies-app.vercel.app/movies', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data), // Convierte el objeto `data` a JSON
            });

            if (response.ok) {
            const result = await response.json();
            console.log('Película agregada con éxito:', result);
            setUseGetData((prevList) => [...prevList, data]);
            setUseSuccess(true);
            setUseTitle("");
            setUseYear("");
            setUseDuration("");
            setUseDirector("");
            setUseGenre("");
            setUsePoster("");
            } else {
            console.error('Error al agregar la película:', response.statusText);
            setUseSuccess(false);
            }
        } catch (error) {
            console.error('Hubo un error con el POST:', error);
        }
        finally{
            setIsLoading(false)
        }

    }




    return(
        <div className="container-form-create">
            <form className="form-movie" onSubmit={sendData}>
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
                
                <button className='button-agregar' type='submit' disabled={isLoading} onClick={openPopup}>Agregar</button>
            </form>
            {
                isLoading ? (
                    <div className='loading-overlay'>
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
                    ): useSuccess ? (
                        <Success isOpen={isPopupOpen}>
                            <h4 className="popup-text">Pelicula Creada!</h4>
                            <p className="popup-text-title">Ya podes acceder a los datos de la misma</p>
                            <button onClick={closePopup} className="button-close">
                                Cerrar
                            </button>
                        </Success>
                    ) : (<ErrorPopUp isOpen={isPopupOpen}>
                            <h4 className="popup-text">Error al crear la pelicula</h4>
                            <p className="popup-text-title">Por favor corrobora los datos de la misma e intenta nuevamente</p>
                            <button onClick={closePopup} className="button-close">
                                Cerrar
                            </button>
                        </ErrorPopUp>)
            }
        </div>
    )
}
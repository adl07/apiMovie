
import { FormEvent, useState } from 'react'
import './create.css'



type DateMovie={
    title: string,
    year:number,
    duration: number,
    director: string,
    poster: string,
    genre: [],
    
}


export default function CreateMovie(){

    const [useTitle, setUseTitle]= useState<string>("")

    const [useYear, setUseYear]= useState<string>("") //int

    const [useDuration, setUseDuration]= useState<string>("") //int

    const [useDirector, setUseDirector]= useState<string>("")
   
    const [usePoster, setUsePoster]= useState<string>("")

    const [useGenre, setUseGenre]= useState<string>("") 

    

    const [useGetData, setUseGetData] = useState<DateMovie[]>([])

   
    
    


    

    const sendData= async (event: FormEvent<HTMLFormElement>)=>{
        event.preventDefault()

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
            } else {
            console.error('Error al agregar la película:', response.statusText);
            }
        } catch (error) {
            console.error('Hubo un error con el POST:', error);
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
                
                <button className='button-agregar' type='submit'>Agregar</button>
            </form>
        </div>
    )
}
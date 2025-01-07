import { FormEvent, useState } from 'react'
import './delete.css'

export default function DeleteMovie(){

    const [useIdMovie, setUseIdMovie] = useState<string>('')

    
    const deleteMovieId= async({id}: {id: string})=>{

        try {
            const response = await fetch(`https://api-movies-app.vercel.app/movies/${id}`,{
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            
            const data = await response.json()
            console.log(data)
        } catch (error) {
            console.log('Ocurrio un error al realizar el proceso', error)
        }
        
    }


    const handleDeleteMovId=()=>{
        deleteMovieId({id: useIdMovie})
    }

    return(
        <div className="container">
            <form className="container-form">
                <label>ID de la Pelicula</label>
                <input
                type="text"
                placeholder="idPelicula"
                onChange={(e)=>setUseIdMovie(e.target.value)}
                value={useIdMovie}/>

                <button className="btn-custom-eliminar" onClick={handleDeleteMovId}>Eliminar</button>
            </form>
            
        </div>
        
    )
}
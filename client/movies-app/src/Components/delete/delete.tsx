import {FormEvent, useState } from 'react'
import './delete.css'
import DeletePopUp from '../delete-movie/delete-popUp';
import {ThreeDots} from 'react-loader-spinner'

export default function DeleteMovie(){

    const [useIdMovie, setUseIdMovie] = useState<string>('');

    const [useDelete, setUseDelete]= useState<boolean>(false);


    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const openPopup = () => setIsPopupOpen(true);

    const closePopup = () => setIsPopupOpen(false);

    const id : string = useIdMovie;
    
    const deleteMovieId= async(event: FormEvent<HTMLFormElement>)=>{
        
        setIsLoading(true);
        event.preventDefault();

        try {
            const response = await fetch(`https://api-movies-app.vercel.app/movies/${id}`,{
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            
            const data = await response.json()
            setUseDelete(true);
            console.log(data)
        } catch (error) {
            console.log('Ocurrio un error al realizar el proceso', error)
        }
        finally{
            setIsLoading(false);
            setUseIdMovie("");
        }
    }


    /*const handleDeleteMovId=()=>{
        deleteMovieId({id: useIdMovie})
    }*/

    return(
        <div className="container">
            <form  className="container-form" onSubmit={deleteMovieId}>
                <label>ID de la Pelicula</label>
                <input
                type="text"
                placeholder="idPelicula"
                onChange={(e)=>setUseIdMovie(e.target.value)}
                value={useIdMovie}/>

                <button className="btn-custom-eliminar" type='submit' disabled={isLoading}  onClick={openPopup} >Eliminar</button>
            </form>
            {
                isLoading ? (
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
                    ): useDelete ? (
                        <DeletePopUp isOpen={isPopupOpen}>
                            <h4 className="popup-text">Pelicula Eliminada!</h4>
                            <button onClick={closePopup} className="button-close">
                                Cerrar
                            </button>
                        </DeletePopUp>
                    ) : null}
        </div>
        
    )
}
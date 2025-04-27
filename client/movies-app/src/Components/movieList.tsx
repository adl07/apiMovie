import { useEffect } from 'react'
import MovieCard from './movieCard';
import { Movie } from './movie';


export default function MovieList({Mov}:{Mov:Movie[]}){

    console.log("Hola soy movieListe",Mov)
    //const [ state, setState] = useState<Mov[]>([]);

    useEffect(() => {

    
    }, []);
    return (
        <>
            <MovieCard 
                id={Mov.id} 
                title={Mov.title} 
                poster={Mov.poster}
                director={Mov.director}
                duration={Mov.duration}
                genre={Mov.genre}
                year={Mov.year}
                public={Mov.public}/>
        </>
    )
}
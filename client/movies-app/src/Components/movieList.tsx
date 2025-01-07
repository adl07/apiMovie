import { useEffect, useState } from 'react'
import MovieCard from './movieCard';
import { Movie } from './movie';


export default function MovieList({Mov}:{Mov:Movie[]}){

    console.log(Mov)
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
                duration={Mov.duration}/>
        </>
    )
}
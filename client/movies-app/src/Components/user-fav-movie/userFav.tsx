
import { useSelector } from "react-redux";


const UserFavMovies: React.FC=()=>{

    const id = useSelector((state)=>state.user.id)

    const userName = useSelector((state) => state.user.username)

    console.log(id)
    console.log(userName)

    return(
        <div>
            <h2>Mis peliculas</h2>
        </div>
    )
}


export default UserFavMovies
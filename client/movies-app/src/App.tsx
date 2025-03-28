
import './App.css'
import SearchId from './Components/search/search'
import CreateMovie from './Components/create/create'
import AllMovies from './Components/all/allMovies'
import UpdateMovie from './Components/update/updateMovie'
import DeleteMovie from './Components/delete/delete'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Components/login/login'
import UserFavMovies from './Components/user-fav-movie/userFav'
import Home from './Components/home/home'
import HomeLogIn from './Components/home-login-in/homeLogIn'
import SingUp from './Components/sing-up/singUp'
import SingUpPlan from './Components/sing-up-plan/singUpPlan'
import Reform from './Components/reform/reform'
import VerifyEmail from './Components/verify-email/verifyEmail'
import Planform from './Components/planform/planform'




function App() {
  return(
    <>
        <BrowserRouter>
          {/**<Header/> */}
        <Routes>
            <Route index path='/' element={<Home/>}></Route>
            <Route path='/home' element={<HomeLogIn/>}></Route>
            <Route path='/allMovies' element={<AllMovies/>} />
            <Route path='/createMovie' element={<CreateMovie/>}></Route>
            <Route path='/searchMovie' element={<SearchId/>}></Route>
            <Route path='/updateMovie' element={<UpdateMovie/>}></Route>
            <Route path='/deleteMovie' element={<DeleteMovie/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/singup' element={<SingUp/>}></Route>
            <Route path='/singup/reform' element={<Reform/>}></Route>
            <Route path='/singup/verifyemail' element={<VerifyEmail/>}></Route>
            <Route path='/singup/plan' element={<SingUpPlan/>}></Route>
            <Route path='/singup/planform' element={<Planform planes={[]}/>}></Route>
            <Route path='/userFav/:idUser' element={<UserFavMovies idUser=''/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

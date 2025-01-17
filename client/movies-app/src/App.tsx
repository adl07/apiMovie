
import './App.css'
import SearchId from './Components/search/search'
import CreateMovie from './Components/create/create'
import AllMovies from './Components/all/allMovies'
import UpdateMovie from './Components/update/updateMovie'
import DeleteMovie from './Components/delete/delete'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './Components/header/header'
import Login from './Components/login/login'



function App() {
  return(

    <div>
        <BrowserRouter>
        <Header/>
        <Routes>
            <Route index path='/' element={<AllMovies/>} />
            <Route path='/createMovie' element={<CreateMovie/>}></Route>
            <Route path='/searchMovie' element={<SearchId/>}></Route>
            <Route path='/updateMovie' element={<UpdateMovie/>}></Route>
            <Route path='/deleteMovie' element={<DeleteMovie/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

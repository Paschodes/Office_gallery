// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { Route, Routes } from 'react-router'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Login />}/>
      <Route path='/signup' element={<Signup />}/>
      <Route path='/home' element={<Home />}/>
    </Routes>
  )
}

export default App

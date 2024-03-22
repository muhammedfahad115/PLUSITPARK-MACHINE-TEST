import { Route, Routes } from 'react-router-dom'
import Login from '../components/Login'
import Register from '../components/Register'
import Home from '../page/Home'
import UpdateProfile from '../components/UpdateProfile'
import AuthGuard from '../authguard/AuthGuard'

function UserRouter() {
  return (
    <>
    <Routes>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/' element={<AuthGuard/>}>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='/updateprofile' element={<UpdateProfile/>} ></Route>
        </Route>
    </Routes>
    </>
  )
}

export default UserRouter
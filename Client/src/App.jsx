import { useState } from 'react'
import SignUpForm from './Forms/SignUp'
import LoginForm from './Forms/Login'
import LostItemForm from './Forms/AddLost'
import LostAndFoundList from './Home/LostFound'
import AdminDashboard from './Admin/AdminBoard'


function App() {


  return (
    <>
    <AdminDashboard/>
    <LostAndFoundList/>
    <LostItemForm/>
    <LoginForm/>
    <SignUpForm/>
    </>
  )
}

export default App

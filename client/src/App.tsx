import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard'
import { useAuthContext } from './hooks/useAuthContext';
import Navbar from './components/Navbar';
import CreatePost from './pages/CreatePost';
import PostInner from './pages/PostInner';
import UpdatePost from './pages/UpdatePost'

function App() {
  const { user } = useAuthContext(); 

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/login' element={user? <Navigate to="/"/> : <Login /> }></Route>
        <Route path='/register' element={user? <Navigate to="/"/>: <Register />}></Route>
        <Route path='/dashboard/:id' element={!user? <Navigate to="/login" />: <Dashboard />}></Route>
        <Route path='/dashboard/blog/:id' element={!user? <Navigate to="/login" />: <PostInner />}></Route>
        <Route path='/create' element={!user? <Navigate to="/login" /> : <CreatePost />}></Route>
        <Route path='/update/:id' element={!user? <Navigate to="/login" /> : <UpdatePost />}></Route>
        <Route path='/' element={<Navigate to='/dashboard/1' />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

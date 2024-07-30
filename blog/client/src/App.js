import {Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Post from './pages/Post';
import Edit from './pages/Edit';
import Navbar from './pages/Navbar';
import Footer from './pages/Footer';
//import Register from './pages/Register';
//import Login from './pages/Login';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import Create from './pages/Create';
import SearchResults from './pages/SearchResults';

import './App.css';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/posts/:id" element={<Post />} />
        <Route path='/posts/:id/Edit' element={<Edit />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/create' element={<Create />} />
        <Route path='/search' element={<SearchResults />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;

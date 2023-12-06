import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import UserProf from './pages/UserProf';
import Dep from './pages/Dep';
import About from './pages/About';
import ComplaintPage from './pages/ComplaintPage';

function App() {
  return (
    <Router>
        <Routes>
          <Route path='*' element={<Home/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path='/signup' element={<SignUp/>}></Route>
          <Route path='/profile' element={<UserProf/>}></Route>
          <Route path='/dep/:name' element={<Dep/>}></Route>
          <Route path='/about' element={<About/>}></Route>
          <Route path='/complaint' element={<ComplaintPage/>}></Route>
        </Routes>
      </Router>
  );
}

export default App;

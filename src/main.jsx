import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/aluno/loginaluno';
import Registeraluno from './pages/aluno/registeraluno';
import Registertutor from './pages/tutor/registertutor';
import Register from './pages/registergeral';
import { TutorProvider } from './context/tutorescontext';
import { AlunosProvider } from './context/alunoscontext';
import BuscarTutor from './pages/aluno/buscartutor';
import UserProfile from './pages/profile';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <TutorProvider>
        <AlunosProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile/:activepage" element={<UserProfile />} />
            <Route path="/register" element={<Register />} />
            <Route path="/registeraluno" element={<Registeraluno />} />
            <Route path="/registertutor" element={<Registertutor />} />
            <Route path="/buscartutor" element={<BuscarTutor />} />
          </Routes>
        </AlunosProvider>
      </TutorProvider>
    </Router>
  </React.StrictMode>
);
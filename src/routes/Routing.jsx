import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import RegistroUser from "../pages/RegistroUser";
import InicioUser from "../pages/InicioUser";
import Home from "../pages/Home";
import Dash from "../pages/Dash";
import ListaP from "../pages/ListaP";
import Perfil from "../pages/Perfil";
import UsuariosPage from "../pages/UsuariosPage";

const Routing = () => {

    return (
        <Router>
            <Routes>
                <Route path="/registro" element={<RegistroUser />} />
                <Route path="/inicio" element={<InicioUser />} />
                <Route path="/lista" element={<ListaP />} />
                <Route path="/dashboard" element={<Dash />} />
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/perfil" element={<Perfil />}/>
                  <Route path="/usuarios" element={<UsuariosPage />} />
            </Routes>
        </Router>
    )
}

export default Routing
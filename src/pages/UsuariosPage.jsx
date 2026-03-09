import React from 'react'
import ListaUsuarios from '../components/ListaUsuarios/ListaUsuarios'
import Navbar from '../components/Navbar/Navbar'

function UsuariosPage() {

    const rol = localStorage.getItem("rol")

    return (
        <div>
            <Navbar rol={rol} />
            <ListaUsuarios />
        </div>
    )
}

export default UsuariosPage
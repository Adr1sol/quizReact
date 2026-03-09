import React from 'react'
import InfoPerfil from '../components/InfoPerfil/InfoPerfil'
import Navbar from '../components/Navbar/Navbar'

function Perfil() {

    const rol = localStorage.getItem("rol")

    return (
        <div>

            <Navbar rol={rol} />
            <InfoPerfil />
        </div>
    )
}

export default Perfil
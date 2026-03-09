import React from 'react'
import ListaProducto from '../components/ListaProducto/ListaProducto'
import Navbar from '../components/Navbar/Navbar'

function ListaP() {

    const rol = localStorage.getItem("rol")

    return (
        <div>

            <Navbar rol={rol} />
            <ListaProducto />
        </div>
    )
}

export default ListaP
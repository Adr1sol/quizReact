import React, { useState } from 'react'
import Dashboard from '../components/Dashboard/Dashboard'
import FormProductos from '../components/FormProductos/FormProductos'
import Navbar from '../components/Navbar/Navbar'

function Dash() {

    const rol = localStorage.getItem("rol")
    const [refresh, setRefresh] = useState(false)
    const [productoEditar, setProductoEditar] = useState(null)

    function actualizarLista() {
        setRefresh(!refresh)  // cambia el valor para disparar el useEffect
        setProductoEditar(null)  // va a limpiar el formulario después de que se edite
    }

    return (
        <div>
            <Navbar rol={rol} />
            <FormProductos onProductoAgregado={actualizarLista} productoEditar={productoEditar} />
            <Dashboard refresh={refresh} onEliminar={actualizarLista} onEditar={setProductoEditar} />
        </div>
    )
}

export default Dash
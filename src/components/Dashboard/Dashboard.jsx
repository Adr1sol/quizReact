
//LISTA QUE VE EL ADMIN DE LOS PRODUCTOS

import React, { useState, useEffect } from 'react'
import ServiceProductos from '../../services/ServiceProductos'
import Swal from "sweetalert2"
import styles from './Dashboard.module.css'

function Dashboard({ refresh, onEliminar, onEditar }) {

    const [productos, setProductos] = useState([])

    useEffect(() => {

        async function traerProductos() {
            const resultado = await ServiceProductos.getproductos()
            setProductos(resultado)
        }

        traerProductos() //Invocar para que muestre en pantalla cuando se refresca la página

    }, [refresh])


    function editar(producto) {
        onEditar(producto)  // manda el producto al formulario
    }


    async function eliminar(id) {

        const resultado = await ServiceProductos.deleteProducto(id)

        if (resultado) {
            Swal.fire({
                title: "Eliminado",
                text: "Producto eliminado correctamente",
                icon: "success",
                confirmButtonText: "Aceptar"
            })

            onEliminar()
        }



    }

    return (
        <div className={styles.contenedor}>
            <h3 className={styles.titulo}>LISTA DE PRODUCTOS</h3>

            <table className={styles.tabla}>
                <thead>
                    <tr>
                        <th className={styles.th}>Producto</th>
                        <th className={styles.th}>Categoría</th>
                        <th className={styles.th}>Precio</th>
                        <th className={styles.th}>Cantidad</th>
                        <th className={styles.th}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map((producto) => (
                        <tr key={producto.id} className={styles.fila}>
                            <td className={styles.td}>{producto.nombre}</td>
                            <td className={styles.td}>
                                <span className={styles.badge}>{producto.categoria}</span>
                            </td>
                            <td className={styles.td}>₡{producto.precio}</td>
                            <td className={styles.td}>{producto.cantidad}</td>
                            <td className={styles.td}>
                                <button className={styles.btnEditar} onClick={() => editar(producto)}>Editar</button>
                                <button className={styles.btnEliminar} onClick={() => eliminar(producto.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Dashboard
import React, { useState, useEffect } from 'react'
import ServiceProductos from '../../services/ServiceProductos'
import styles from './ListaProducto.module.css'

function ListaProducto() {

    const [productos, setProductos] = useState([])
    const nombre = localStorage.getItem("nombre")

    useEffect(() => {
        async function traerProductos() {
            const resultado = await ServiceProductos.getproductos()
            setProductos(resultado)
        }
        traerProductos()
    }, [])

    return (
        <div className={styles.contenedor}>
            <h2 className={styles.bienvenida}>Hola {nombre}, bienvenido/a</h2>
            <h3 className={styles.subtitulo}>Tienda de Compra</h3>

            <table className={styles.tabla}>
                <thead>
                    <tr>
                        <th className={styles.th}>Producto</th>
                        <th className={styles.th}>Categoría</th>
                        <th className={styles.th}>Precio</th>
                        <th className={styles.th}>Cantidad</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map((producto) => (
                        <tr key={producto.id} className={styles.fila}>
                            <td className={styles.td}>{producto.nombre}</td>
                            <td className={styles.td}>
                                <span className={styles.badge}>{producto.categoria}</span>
                            </td>
                            <td className={`${styles.td} ${styles.precio}`}>₡{producto.precio}</td>
                            <td className={styles.td}>{producto.cantidad}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ListaProducto
import { useState, useEffect } from "react"
import ServiceProductos from "../../services/ServiceProductos"
import Swal from "sweetalert2"
import styles from './FormProductos.module.css'

const FormProductos = ({ onProductoAgregado, productoEditar }) => {
    const [nombreProducto, setNombreProducto] = useState("")
    const [precioProducto, setPrecioProducto] = useState("")
    const [categoriaProducto, setCategoriaProducto] = useState("")
    const [cantidadProducto, setCantidadProducto] = useState("")

    useEffect(() => {
        if (productoEditar) {
            setNombreProducto(productoEditar.nombre)
            setPrecioProducto(productoEditar.precio)
            setCategoriaProducto(productoEditar.categoria)
            setCantidadProducto(productoEditar.cantidad)
        } else {
            setNombreProducto("")
            setPrecioProducto("")
            setCategoriaProducto("")
            setCantidadProducto("")
        }
    }, [productoEditar])

    async function subirProducto() {
        const objProducto = {
            nombre: nombreProducto,
            precio: precioProducto,
            categoria: categoriaProducto,
            cantidad: cantidadProducto
        }

        let resultado

        if (productoEditar) {
            resultado = await ServiceProductos.putProducto(objProducto, productoEditar.id)
        } else {
            resultado = await ServiceProductos.postProductos(objProducto)
        }

        if (resultado) {
            Swal.fire({
                title: "¡Éxito!",
                text: productoEditar ? "Producto actualizado correctamente" : "Producto agregado correctamente",
                icon: "success",
                confirmButtonText: "Aceptar"
            })
            onProductoAgregado()
            setNombreProducto("")
            setPrecioProducto("")
            setCategoriaProducto("")
            setCantidadProducto("")
        } else {
            Swal.fire({
                title: "Error",
                text: "No se pudo completar la operación",
                icon: "error",
                confirmButtonText: "Aceptar"
            })
        }
    }

    return (
        <div className={styles.contenedor}>
            <h2 className={styles.titulo}>
                {productoEditar ? "Editar Producto" : "Dashboard Admin"}
            </h2>

            <div className={styles.formulario}>
                <input
                    className={styles.input}
                    type="text"
                    value={nombreProducto}
                    placeholder="Nombre producto"
                    onChange={(e) => setNombreProducto(e.target.value)}
                />
                <input
                    className={styles.input}
                    type="text"
                    value={precioProducto}
                    placeholder="Precio producto"
                    onChange={(e) => setPrecioProducto(e.target.value)}
                />
                <select
                    className={styles.select}
                    value={categoriaProducto}
                    onChange={(e) => setCategoriaProducto(e.target.value)}>
                    <option value="">Seleccione la categoría</option>
                    <option value="lacteos">Lacteos</option>
                    <option value="carnes">Carnes</option>
                    <option value="granos">Granos</option>
                </select>
                <input
                    className={styles.input}
                    type="text"
                    value={cantidadProducto}
                    placeholder="Cantidad producto"
                    onChange={(e) => setCantidadProducto(e.target.value)}
                />
                <button className={styles.boton} onClick={subirProducto}>
                    {productoEditar ? "Modificar Producto" : "Agregar Producto"}
                </button>
            </div>
        </div>
    )
}

export default FormProductos
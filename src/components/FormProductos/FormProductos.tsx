import { useState, useEffect } from "react"
import ServiceProductos from "../../services/ServiceProductos"
import Swal from "sweetalert2"
import './FormProductos.module.css'

type Producto = {
    nombre: string,
    precio: string,
    categoria: string,
    cantidad: string
}

interface Props {
    onProductoAgregado: () => void
    productoEditar: any | null
}

const FormProductos = ({ onProductoAgregado, productoEditar }: Props) => {
    const [nombreProducto, setNombreProducto] = useState<string>("")
    const [precioProducto, setPrecioProducto] = useState<string>("")
    const [categoriaProducto, setCategoriaProducto] = useState<string>("")
    const [cantidadProducto, setCantidadProducto] = useState<string>("")

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
        const objProducto : Producto = {
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
        <div className="contenedor">
            <h2 className="titulo">
                {productoEditar ? "Editar Producto" : "Dashboard Admin"}
            </h2>

            <div className="formulario">
                <input
                    className="input"
                    type="text"
                    value={nombreProducto}
                    placeholder="Nombre producto"
                    onChange={(e) => setNombreProducto(e.target.value)}
                />
                <input
                    className="input"
                    type="text"
                    value={precioProducto}
                    placeholder="Precio producto"
                    onChange={(e) => setPrecioProducto(e.target.value)}
                />
                <select
                    className="select"
                    value={categoriaProducto}
                    onChange={(e) => setCategoriaProducto(e.target.value)}>
                    <option value="">Seleccione la categoría</option>
                    <option value="lacteos">Lacteos</option>
                    <option value="carnes">Carnes</option>
                    <option value="granos">Granos</option>
                </select>
                <input
                    className="intput"
                    type="text"
                    value={cantidadProducto}
                    placeholder="Cantidad producto"
                    onChange={(e) => setCantidadProducto(e.target.value)}
                />
                <button className="boton" onClick={subirProducto}>
                    {productoEditar ? "Modificar Producto" : "Agregar Producto"}
                </button>
            </div>
        </div>
    )
}

export default FormProductos
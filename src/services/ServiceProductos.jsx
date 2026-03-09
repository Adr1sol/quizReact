// GET productos - función que consulta todos los productos
async function getproductos() {
    try {
        const respuestaServidor = await fetch("http://localhost:3000/productos")
        
        const datosproductos = await respuestaServidor.json();

        return datosproductos;

    } catch (error) {
        console.error("Error al obtener los productos", error);
    }
}


// POST productos - función para guardar un nuevo usuario
async function postProductos(producto) {
    try {
        const respuesta = await fetch("http://localhost:3000/productos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(producto)
        })

        const datosProductos = await respuesta.json();

        return datosProductos;

    } catch (error) {
        console.error("Error al registrar el producto", error);
    }
}


// PUT productos - función para actualizar un usuario existente
async function putProducto(producto, id) {
    try {
        const respuesta = await fetch("http://localhost:3000/productos/" + id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(producto)
        })

        const datosProductos = await respuesta.json();

        return datosProductos;

    } catch (error) {
        console.error("Error al actualizar el productos", error);
    }
}


// DELETE productos - función para eliminar un usuario
async function deleteProducto(id) {
    try {
        const respuesta = await fetch("http://localhost:3000/productos/" + id, {
            method: "DELETE"
        })

        const datosProductos = await respuesta.json();

        return datosProductos;

    } catch (error) {
        console.error("Error al eliminar el producto", error);
    }
}


export default { getproductos, postProductos, putProducto, deleteProducto }
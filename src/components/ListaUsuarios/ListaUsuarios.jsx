import React, { useState, useEffect } from 'react'
import ServiceUser from '../../services/ServiceUser'
import Swal from 'sweetalert2'
import styles from './ListaUsuarios.module.css'

function ListaUsuarios() {

    const [usuarios, setUsuarios] = useState([])
    const [usuarioEditar, setUsuarioEditar] = useState(null)
    const [nombre, setNombre] = useState("")
    const [correo, setCorreo] = useState("")
    const [rol, setRol] = useState("")

    useEffect(() => {
        async function traerUsuarios() {
            const data = await ServiceUser.getUsuarios()
            setUsuarios(data)
        }
        traerUsuarios()
    }, [])

    // Cuando se selecciona un usuario a editar, llena los inputs
    useEffect(() => {
        if (usuarioEditar) {
            setNombre(usuarioEditar.nombre)
            setCorreo(usuarioEditar.correo)
            setRol(usuarioEditar.rol)
        } else {
            setNombre("")
            setCorreo("")
            setRol("")
        }
    }, [usuarioEditar])

    async function eliminar(id) {
        const resultado = await ServiceUser.deleteUsuario(id)
        if (resultado) {
            Swal.fire({
                title: "Eliminado",
                text: "Usuario eliminado correctamente",
                icon: "success",
                confirmButtonText: "Aceptar"
            })
            setUsuarios(usuarios.filter((u) => u.id !== id))
        }
    }

    async function guardarCambios() {
        const objUsuario = {
            nombre,
            correo,
            rol,
            clave: usuarioEditar.clave
        }
        const resultado = await ServiceUser.putUsuario(objUsuario, usuarioEditar.id)
        if (resultado) {
            Swal.fire({
                title: "Actualizado",
                text: "Usuario actualizado correctamente",
                icon: "success",
                confirmButtonText: "Aceptar"
            })
            // Refresca la lista
            const data = await ServiceUser.getUsuarios()
            setUsuarios(data)
            setUsuarioEditar(null)
        }
    }

    return (
        <div className={styles.contenedor}>
            <h3 className={styles.titulo}>Lista de Usuarios</h3>

            {/* Formulario de editar - solo aparece cuando se selecciona un usuario */}
            {usuarioEditar && (
                <div className={styles.formulario}>
                    <h4 className={styles.tituloForm}>Editando: {usuarioEditar.nombre}</h4>
                    <input className={styles.input} type="text" value={nombre} placeholder="Nombre" onChange={(e) => setNombre(e.target.value)} />
                    <input className={styles.input} type="text" value={correo} placeholder="Correo" onChange={(e) => setCorreo(e.target.value)} />
                    <select className={styles.select} value={rol} onChange={(e) => setRol(e.target.value)}>
                        <option value="cliente">Cliente</option>
                        <option value="admin">Admin</option>
                    </select>
                    <div className={styles.botonesForm}>
                        <button className={styles.btnGuardar} onClick={guardarCambios}>Guardar Cambios</button>
                        <button className={styles.btnCancelar} onClick={() => setUsuarioEditar(null)}>Cancelar</button>
                    </div>
                </div>
            )}

            <table className={styles.tabla}>
                <thead>
                    <tr>
                        <th className={styles.th}>Nombre</th>
                        <th className={styles.th}>Correo</th>
                        <th className={styles.th}>Rol</th>
                        <th className={styles.th}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((usuario) => (
                        <tr key={usuario.id} className={styles.fila}>
                            <td className={styles.td}>{usuario.nombre}</td>
                            <td className={styles.td}>{usuario.correo}</td>
                            <td className={styles.td}>
                                <span className={styles.badge}>{usuario.rol}</span>
                            </td>
                            <td className={styles.td}>
                                <button className={styles.btnEditar} onClick={() => setUsuarioEditar(usuario)}>Editar</button>
                                <button className={styles.btnEliminar} onClick={() => eliminar(usuario.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ListaUsuarios
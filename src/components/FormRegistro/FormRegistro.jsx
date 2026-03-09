import React, { useState } from 'react'
import ServiceUser from "../../services/ServiceUser"
import { useNavigate } from "react-router-dom"
import styles from './FormRegistro.module.css'

function FormRegistro() {

    const [nombreUsuario, setNombreUsuario] = useState("")
    const [claveUsuario, setClaveUsuario] = useState("")
    const [correoUsuario, setCorreoUsuario] = useState("")
    const [rolUsuario, setrolUsuario] = useState("cliente")
    const [mensaje, setMensaje] = useState("")
    const navigate = useNavigate()

    async function registroUsuario() {

        if (!nombreUsuario || !claveUsuario || !correoUsuario) {
            setMensaje("Todos los campos deben estar llenos")
            return
        }

        const objRegistro = {
            nombre: nombreUsuario,
            clave: claveUsuario,
            correo: correoUsuario,
            rol: rolUsuario
        }

        console.log(objRegistro)

        const usuarioRegistrado = await ServiceUser.postRegistro(objRegistro)

        if (usuarioRegistrado) {
            setMensaje("Usuario registrado exitosamente")

            setTimeout(() => {
                if (rolUsuario === "admin") {
                    localStorage.setItem("rol", "admin")
                    localStorage.setItem("nombre", nombreUsuario)

                    navigate("/dashboard")
                } else {
                    localStorage.setItem("rol", "cliente")
                    localStorage.setItem("nombre", nombreUsuario)

                    navigate("/lista", { state: { nombre: nombreUsuario } })
                }
            }, 2000)

        } else {
            setMensaje("Error al registrar el usuario")
        }
    }

    return (
        <div className={styles.contenedor}>
            <h2 className={styles.titulo}>Crear Cuenta</h2>

            <p className={styles.label}>Nombre Completo</p>
            <input
                className={styles.input}
                type="text"
                value={nombreUsuario}
                onChange={(evento) => setNombreUsuario(evento.target.value)}
            />

            <p className={styles.label}>Contraseña</p>
            <input
                className={styles.input}
                type="password"
                value={claveUsuario}
                onChange={(evento) => setClaveUsuario(evento.target.value)}
            />

            <p className={styles.label}>Correo Electrónico</p>
            <input
                className={styles.input}
                type="text"
                value={correoUsuario}
                onChange={(evento) => setCorreoUsuario(evento.target.value)}
            />

            <p className={styles.label}>Rol</p>
            <select
                className={styles.select}
                value={rolUsuario}
                onChange={(evento) => setrolUsuario(evento.target.value)}>
                <option value="cliente">Cliente</option>
                <option value="admin">Admin</option>
            </select>

            <button className={styles.boton} onClick={registroUsuario}>Guardar</button>

            {mensaje && (
                <div className={mensaje.includes("exitosamente") ? styles.mensajeExito : styles.mensajeError}>
                    {mensaje}
                </div>
            )}
        </div>
    )
}

export default FormRegistro
import React, { useState } from 'react'
import ServiceUser from "../../services/ServiceUser"
import { useNavigate } from "react-router-dom"
import styles from './FormInicio.module.css'

function FormInicio() {

    const [nombreUsuario, setNombreUsuario] = useState("")
    const [claveUsuario, setClaveUsuario] = useState("")
    const [mensaje, setMensaje] = useState("")
    const [rol, setrol] = useState("cliente")
    const navigate = useNavigate()

    async function inicioUsuario() {

        if (!nombreUsuario || !claveUsuario) {
            setMensaje("Todos los campos deben estar llenos")
            return
        }

        const usuarios = await ServiceUser.getUsuarios()

        const usuarioEncontrado = usuarios.find(
            (u) => u.nombre === nombreUsuario && u.clave === claveUsuario
        )

        if (usuarioEncontrado) {
            setMensaje("Bienvenido/a " + nombreUsuario + "!")

            // Espera 2 segundos y redirige según el rol
            setTimeout(() => {
                if ( usuarioEncontrado.rol === "admin") {
                    localStorage.setItem("rol", "admin")
                    localStorage.setItem("nombre", nombreUsuario)
                    navigate("/dashboard")
                } else {
                    localStorage.setItem("rol", "cliente")
                    localStorage.setItem("nombre", nombreUsuario)
                    navigate("/perfil", { state: { nombre: nombreUsuario } })
                }
            }, 2000)

        } else {
            setMensaje("Usuario o contraseña incorrectos")
        }
    }

    return (
         <div className={styles.contenedor}>
            <h2 className={styles.titulo}>Inicio de Sesión</h2>

            <p className={styles.label}>Nombre completo</p>
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

            <button className={styles.boton} onClick={inicioUsuario}>Entrar</button>

            {mensaje && (
                <div className={mensaje.includes("incorrectos") ? styles.mensajeError : styles.mensajeExito}>
                    {mensaje}
                </div>
            )}
        </div>
    )
}

export default FormInicio
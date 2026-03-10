import React, { useState } from 'react'
import ServiceUser from "../../services/ServiceUser"
import { useNavigate } from "react-router-dom"
import './FormInicio.module.css'

function FormInicio() {

    const [nombreUsuario, setNombreUsuario] = useState<string>("")
    const [claveUsuario, setClaveUsuario] = useState<string>("")
    const [mensaje, setMensaje] = useState<string>("")
    const [rol, setrol] = useState<string>("cliente")
    const navigate = useNavigate()

    async function inicioUsuario() {

        if (!nombreUsuario || !claveUsuario) {
            setMensaje("Todos los campos deben estar llenos")
            return
        }

        const usuarios = await ServiceUser.getUsuarios()

        const usuarioEncontrado = usuarios.find(
            (u : any) => u.nombre === nombreUsuario && u.clave === claveUsuario
        )

        if (usuarioEncontrado) {
            setMensaje("Bienvenido/a " + nombreUsuario + "!")

            // Espera 2 segundos y redirige según el rol
            setTimeout(() => {
                if (usuarioEncontrado.rol === "admin") {
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
        <div className="contenedor">
            <h2 className="titulo">Inicio de Sesión</h2>

            <p className="label">Nombre completo</p>
            <input
                className="input"
                type="text"
                value={nombreUsuario}
                onChange={(evento) => setNombreUsuario(evento.target.value)}
            />

            <p className="label">Contraseña</p>
            <input
                className="input"
                type="password"
                value={claveUsuario}
                onChange={(evento) => setClaveUsuario(evento.target.value)}
            />

            <button className="boton" onClick={inicioUsuario}>Entrar</button>

            {mensaje && (
                <div className={mensaje.includes("incorrectos") ? "mensajeError" : "mensajeExito"}>
                    {mensaje}
                </div>
            )}
        </div>
    )
}

export default FormInicio
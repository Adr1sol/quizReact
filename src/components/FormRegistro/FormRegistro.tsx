import React, { useState } from 'react'
import ServiceUser from "../../services/ServiceUser"
import { useNavigate } from "react-router-dom"
import  './FormRegistro.module.css'

type Registro = {
    nombre: string,
    clave: string,
    correo: string,
    rol: string
}



function FormRegistro() {

    const [nombreUsuario, setNombreUsuario] = useState<string>("")
    const [claveUsuario, setClaveUsuario] = useState<string>("")
    const [correoUsuario, setCorreoUsuario] = useState<string>("")
    const [rolUsuario, setrolUsuario] = useState<string>("cliente")
    const [mensaje, setMensaje] = useState<string>("")
    const navigate = useNavigate()

    async function registroUsuario() {

        if (!nombreUsuario || !claveUsuario || !correoUsuario) {
            setMensaje("Todos los campos deben estar llenos")
            return
        }

        const objRegistro: Registro = {
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
        <div className="contenedor">
            <h2 className="titulo">Crear Cuenta</h2>

            <p className="label">Nombre Completo</p>
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

            <p className="label">Correo Electrónico</p>
            <input
                className="input"
                type="text"
                value={correoUsuario}
                onChange={(evento) => setCorreoUsuario(evento.target.value)}
            />

            <p className="label">Rol</p>
            <select
                className="select"
                value={rolUsuario}
                onChange={(evento) => setrolUsuario(evento.target.value)}>
                <option value="cliente">Cliente</option>
                <option value="admin">Admin</option>
            </select>

            <button className="boton" onClick={registroUsuario}>Guardar</button>

            {mensaje && (
                <div className={mensaje.includes("exitosamente") ? "mensajeExito" : "mensajeError"}>
                    {mensaje}
                </div>
            )}
        </div>
    )
}

export default FormRegistro
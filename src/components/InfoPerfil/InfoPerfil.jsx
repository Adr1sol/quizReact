import React, { useState, useEffect } from 'react'
import ServiceUser from '../../services/ServiceUser'
import styles from './InfoPerfil.module.css'

function InfoPerfil() {

    const [usuario, setUsuario] = useState(null)
    const nombre = localStorage.getItem("nombre")

    useEffect(() => {
        async function traerUsuario() {
            const usuarios = await ServiceUser.getUsuarios()
            const usuarioEncontrado = usuarios.find((u) => u.nombre === nombre)
            setUsuario(usuarioEncontrado)
        }
        traerUsuario()
    }, [])

    return (
        <div className={styles.contenedor}>
            <h2 className={styles.titulo}>Mi Perfil</h2>

            {usuario ? (
                <div className={styles.tarjeta}>
                    <div className={styles.fila}>
                        <span className={styles.label}>Nombre</span>
                        <span className={styles.valor}>{usuario.nombre}</span>
                    </div>
                    <div className={styles.fila}>
                        <span className={styles.label}>Correo</span>
                        <span className={styles.valor}>{usuario.correo}</span>
                    </div>
                    <div className={styles.fila}>
                        <span className={styles.label}>Rol</span>
                        <span className={styles.badge}>{usuario.rol}</span>
                    </div>
                </div>
            ) : (
                <p className={styles.cargando}>Cargando información...</p>
            )}
        </div>
    )
}

export default InfoPerfil
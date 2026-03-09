import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Navbar.module.css'

function Navbar({ rol }) {

    const navigate = useNavigate()

    function cerrarSesion() {
        localStorage.removeItem("rol")
        localStorage.removeItem("nombre")
        navigate("/")
    }

    return (
        <nav className={styles.navbar}>
            <div className={styles.navMarca} onClick={() => navigate("/")}>
                ◈ MarketApp
            </div>
            <div className={styles.navLinks}>

                {!rol && (
                    <>
                        <button onClick={() => navigate("/")} className={styles.navBtn}>Inicio</button>
                        <button onClick={() => navigate("/registro")} className={styles.navBtn}>Registro</button>
                        <button onClick={() => navigate("/inicio")} className={styles.navBtn}>Iniciar Sesión</button>
                    </>
                )}

                {rol === "admin" && (
                    <>
                        <button onClick={() => navigate("/perfil")} className={styles.navBtn}>Perfil</button>
                        <button onClick={() => navigate("/dashboard")} className={styles.navBtn}>Productos</button>
                        <button onClick={cerrarSesion} className={styles.navBtnCerrar}>Cerrar Sesión</button>
                    </>
                )}

                {rol === "cliente" && (
                    <>
                        <button onClick={() => navigate("/perfil")} className={styles.navBtn}>Perfil</button>
                        <button onClick={() => navigate("/lista")} className={styles.navBtn}>Tienda</button>
                        <button onClick={cerrarSesion} className={styles.navBtnCerrar}>Cerrar Sesión</button>
                    </>
                )}

            </div>
        </nav>
    )
}

export default Navbar
import React from 'react'

function NavbarHome({ vistaActual, setVistaActual }) {

    return (
        <nav style={estilos.navbar}>
            <div style={estilos.navMarca} onClick={() => setVistaActual("inicio")}>
                ◈ MarketApp
            </div>
            <div style={estilos.navLinks}>
                <button
                    onClick={() => setVistaActual("inicio")}
                    style={{ ...estilos.navBtn, ...(vistaActual === "inicio" ? estilos.navBtnActivo : {}) }}>
                    Inicio
                </button>
                <button
                    onClick={() => setVistaActual("registro")}
                    style={{ ...estilos.navBtn, ...(vistaActual === "registro" ? estilos.navBtnActivo : {}) }}>
                    Registro
                </button>
                <button
                    onClick={() => setVistaActual("sesion")}
                    style={{ ...estilos.navBtn, ...(vistaActual === "sesion" ? estilos.navBtnActivo : {}) }}>
                    Iniciar Sesión
                </button>
            </div>
        </nav>
    )
}

const estilos = {
    navbar: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px 40px",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        backgroundColor: "rgba(15,15,15,0.95)",
        position: "sticky",
        top: 0,
        zIndex: 100,
        backdropFilter: "blur(10px)"
    },
    navMarca: {
        fontSize: "22px",
        fontWeight: "bold",
        color: "#a5b4fc",
        cursor: "pointer",
        letterSpacing: "2px"
    },
    navLinks: {
        display: "flex",
        gap: "8px"
    },
    navBtn: {
        background: "transparent",
        border: "1px solid rgba(255,255,255,0.1)",
        color: "rgba(255,255,255,0.6)",
        padding: "8px 18px",
        borderRadius: "20px",
        cursor: "pointer",
        fontSize: "14px",
        transition: "all 0.2s"
    },
    navBtnActivo: {
        background: "rgba(99,102,241,0.2)",
        border: "1px solid rgba(99,102,241,0.5)",
        color: "#a5b4fc"
    }
}

export default NavbarHome

import React, { useState } from 'react'
import FormRegistro from '../components/FormRegistro/FormRegistro'
import FormInicio from '../components/FormInicio/FormInicio'
import NavbarHome from '../components/NavbarHome/NavbarHome'

function Home() {

    const [vistaActual, setVistaActual] = useState("inicio")

    return (
        <div style={estilos.contenedor}>

            <div style={estilos.fondoDecorativo}></div>

            <NavbarHome vistaActual={vistaActual} setVistaActual={setVistaActual} />

            <div style={estilos.contenido}>

                {vistaActual === "inicio" && (
                    <div style={estilos.portada}>
                        <p style={estilos.subtitulo}>Bienvenido a</p>
                        <h1 style={estilos.titulo}>MarketApp</h1>
                        <p style={estilos.descripcion}>
                            Gestiona tus compras de forma sencilla.<br />
                            Regístrate, inicia sesión y administra tu lista de compras.
                        </p>
                        <div style={estilos.botones}>
                            <button onClick={() => setVistaActual("registro")} style={estilos.btnPrimario}>
                                Crear cuenta
                            </button>
                            <button onClick={() => setVistaActual("sesion")} style={estilos.btnSecundario}>
                                Iniciar sesión
                            </button>
                        </div>
                    </div>
                )}

                {vistaActual === "registro" && (
                    <div style={estilos.tarjeta}>
                        <FormRegistro />
                    </div>
                )}

                {vistaActual === "sesion" && (
                    <div style={estilos.tarjeta}>
                        <FormInicio />
                    </div>
                )}

            </div>
        </div>
    )
}

const estilos = {
    contenedor: {
        minHeight: "100vh",
        backgroundColor: "#0f0f0f",
        color: "#ffffff",
        fontFamily: "'Georgia', serif",
        position: "relative",
        overflow: "hidden"
    },
    fondoDecorativo: {
        position: "fixed",
        top: "-200px",
        right: "-200px",
        width: "600px",
        height: "600px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)",
        pointerEvents: "none"
    },
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
    },
    contenido: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "calc(100vh - 80px)",
        padding: "40px 20px"
    },
    portada: {
        textAlign: "center",
        maxWidth: "600px"
    },
    subtitulo: {
        color: "#a5b4fc",
        letterSpacing: "4px",
        textTransform: "uppercase",
        fontSize: "13px",
        marginBottom: "10px"
    },
    titulo: {
        fontSize: "72px",
        fontWeight: "bold",
        margin: "0 0 20px 0",
        background: "linear-gradient(135deg, #ffffff 0%, #a5b4fc 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent"
    },
    descripcion: {
        color: "rgba(255,255,255,0.5)",
        fontSize: "16px",
        lineHeight: "1.8",
        marginBottom: "40px"
    },
    botones: {
        display: "flex",
        gap: "16px",
        justifyContent: "center"
    },
    btnPrimario: {
        backgroundColor: "#6366f1",
        color: "white",
        border: "none",
        padding: "14px 32px",
        borderRadius: "8px",
        fontSize: "15px",
        cursor: "pointer"
    },
    btnSecundario: {
        backgroundColor: "transparent",
        color: "white",
        border: "1px solid rgba(255,255,255,0.2)",
        padding: "14px 32px",
        borderRadius: "8px",
        fontSize: "15px",
        cursor: "pointer"
    },
    tarjeta: {
        backgroundColor: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "16px",
        padding: "40px",
        minWidth: "380px"
    }
}

export default Home
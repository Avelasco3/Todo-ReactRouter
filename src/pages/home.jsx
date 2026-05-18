import { useNavigate } from "react-router";
import { useState } from "react";

const Home = ({ tasks = [] }) => {
    const navigate = useNavigate();
    const [modalInfo, setModalInfo] = useState(null);

    const urgenciaEstilo = {
        Alta: { background: "var(--urgency-alta-bg)", color: "var(--urgency-alta-txt)" },
        Media: { background: "var(--urgency-media-bg)", color: "var(--urgency-media-txt)" },
        Baja: { background: "var(--urgency-baja-bg)", color: "var(--urgency-baja-txt)" },
    };

    const categoriaEstilo = {
        Trabajo: { background: "var(--cat-trabajo-bg)", color: "var(--cat-trabajo-txt)" },
        Personal: { background: "var(--cat-personal-bg)", color: "var(--cat-personal-txt)" },
    };

    const totalTareas = tasks;
    const urgentes = tasks.filter((t) => t.urgencia === "Alta" && !t.completada);
    const completadas = tasks.filter((t) => t.completada);

    const tarjetas = [
        { key: "total", label: "Tareas totales", valor: totalTareas.length, color: "var(--text-primary)", lista: totalTareas },
        { key: "urgentes", label: "Urgentes", valor: urgentes.length, color: "var(--urgency-alta-txt)", lista: urgentes },
        { key: "completadas", label: "Completadas", valor: completadas.length, color: "var(--urgency-baja-txt)", lista: completadas },
    ];

    const listaModal = modalInfo ? tarjetas.find((t) => t.key === modalInfo)?.lista : [];
    const tituloModal = modalInfo ? tarjetas.find((t) => t.key === modalInfo)?.label : "";

    return (
        <div style={{ padding: "28px" }}>
            {/* Saludo */}
            <h1 style={{ fontSize: "20px", marginBottom: "6px" }}>
                ¡Bienvenido, Andrés!
            </h1>
            <p style={{ fontSize: "13px", color: "var(--text-muted)", marginBottom: "24px", lineHeight: "1.6" }}>
                Aquí tienes un resumen de tus tareas. Organiza tu día con claridad.
            </p>

            {/* Tarjetas */}
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "12px",
                marginBottom: "28px",
            }}>
                {tarjetas.map((t) => (
                    <div
                        key={t.key}
                        onClick={() => setModalInfo(t.key)}
                        style={{
                            background: "var(--bg-card)",
                            border: "0.5px solid var(--border-subtle)",
                            borderRadius: "10px",
                            padding: "18px",
                            cursor: "pointer",
                            transition: "border-color 0.15s",
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.borderColor = "var(--border-blue)"}
                        onMouseLeave={(e) => e.currentTarget.style.borderColor = "var(--border-subtle)"}
                    >
                        <div style={{ fontSize: "11px", color: "var(--text-muted)", marginBottom: "8px" }}>
                            {t.label}
                        </div>
                        <div style={{ fontSize: "26px", fontWeight: "500", color: t.color }}>
                            {t.valor}
                        </div>
                        <div style={{ fontSize: "11px", color: "var(--text-faint)", marginTop: "6px" }}>
                            Ver detalle →
                        </div>
                    </div>
                ))}
            </div>

            {/* CTA */}
            <div style={{ borderTop: "0.5px solid var(--border-subtle)", paddingTop: "24px" }}>
                <p style={{ fontSize: "13px", color: "var(--text-muted)", marginBottom: "16px" }}>
                    ¿Listo para agregar nuevas tareas a tu lista?
                </p>
                <button
                    onClick={() => navigate("/tareas")}
                    style={{
                        background: "var(--blue-primary)",
                        color: "#fff",
                        border: "none",
                        borderRadius: "8px",
                        padding: "11px 22px",
                        fontSize: "13px",
                        fontWeight: "500",
                        cursor: "pointer",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "7px",
                    }}
                >
                    + Crear nueva tarea
                </button>
            </div>

            {/* Modal */}
            {modalInfo && (
                <div
                    onClick={() => setModalInfo(null)}
                    style={{
                        position: "fixed",
                        inset: 0,
                        background: "rgba(0,0,0,0.6)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 100,
                    }}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            background: "var(--bg-card)",
                            border: "0.5px solid var(--border-subtle)",
                            borderRadius: "12px",
                            padding: "24px",
                            width: "400px",
                            maxWidth: "90vw",
                            maxHeight: "80vh",
                            overflowY: "auto",
                        }}
                    >
                        <div style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: "16px",
                        }}>
                            <span style={{ fontSize: "14px", fontWeight: "500", color: "var(--text-primary)" }}>
                                {tituloModal}
                            </span>
                            <button
                                onClick={() => setModalInfo(null)}
                                style={{
                                    background: "none",
                                    border: "none",
                                    color: "var(--text-muted)",
                                    fontSize: "18px",
                                    cursor: "pointer",
                                }}
                            >
                                ×
                            </button>
                        </div>

                        {listaModal.length === 0 ? (
                            <p style={{ fontSize: "12px", color: "var(--text-faint)", textAlign: "center", padding: "16px 0" }}>
                                No hay tareas en esta categoría
                            </p>
                        ) : (
                            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                {listaModal.map((tarea) => (
                                    <div
                                        key={tarea.id}
                                        style={{
                                            background: "var(--bg-base)",
                                            border: "0.5px solid var(--border-subtle)",
                                            borderRadius: "8px",
                                            padding: "10px 13px",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "10px",
                                        }}
                                    >
                                        <span style={{ flex: 1, fontSize: "12px", color: "var(--text-primary)" }}>
                                            {tarea.texto}
                                        </span>
                                        <span style={{
                                            fontSize: "10px",
                                            padding: "2px 8px",
                                            borderRadius: "20px",
                                            ...urgenciaEstilo[tarea.urgencia]
                                        }}>
                                            {tarea.urgencia}
                                        </span>
                                        <span style={{
                                            fontSize: "10px",
                                            padding: "2px 8px",
                                            borderRadius: "20px",
                                            ...categoriaEstilo[tarea.categoria]
                                        }}>
                                            {tarea.categoria}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
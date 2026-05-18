import { useState } from "react";

const Calendario = ({ tasks = [] }) => {
    const [diaSeleccionado, setDiaSeleccionado] = useState(null);
    const [mesActual, setMesActual] = useState(new Date());

    const hoy = new Date();
    const anio = mesActual.getFullYear();
    const mes = mesActual.getMonth();

    const nombresMes = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    const diasSemana = ["Lu", "Ma", "Mi", "Ju", "Vi", "Sa", "Do"];

    // Primer día del mes y total de días
    const primerDia = new Date(anio, mes, 1);
    const totalDias = new Date(anio, mes + 1, 0).getDate();

    // Ajuste: lunes = 0
    let inicioSemana = primerDia.getDay() - 1;
    if (inicioSemana < 0) inicioSemana = 6;

    const mesAnterior = () => setMesActual(new Date(anio, mes - 1, 1));
    const mesSiguiente = () => setMesActual(new Date(anio, mes + 1, 1));

    const formatearFecha = (dia) => {
        const mm = String(mes + 1).padStart(2, "0");
        const dd = String(dia).padStart(2, "0");
        return `${anio}-${mm}-${dd}`;
    };

    const tareasDelDia = (dia) => {
        const fechaStr = formatearFecha(dia);
        return tasks.filter((t) => t.fecha === fechaStr);
    };

    const urgenciaColor = {
        Alta: "#f87171",
        Media: "#fbbf24",
        Baja: "#4ade80",
    };

    const urgenciaEstilo = {
        Alta: { background: "var(--urgency-alta-bg)", color: "var(--urgency-alta-txt)" },
        Media: { background: "var(--urgency-media-bg)", color: "var(--urgency-media-txt)" },
        Baja: { background: "var(--urgency-baja-bg)", color: "var(--urgency-baja-txt)" },
    };

    const categoriaEstilo = {
        Trabajo: { background: "var(--cat-trabajo-bg)", color: "var(--cat-trabajo-txt)" },
        Personal: { background: "var(--cat-personal-bg)", color: "var(--cat-personal-txt)" },
    };

    const esHoy = (dia) =>
        dia === hoy.getDate() &&
        mes === hoy.getMonth() &&
        anio === hoy.getFullYear();

    const esSeleccionado = (dia) => diaSeleccionado === dia;

    const tareasDiaSeleccionado = diaSeleccionado ? tareasDelDia(diaSeleccionado) : [];

    // Construir celdas del calendario
    const celdas = [];

    // Celdas vacías del inicio
    for (let i = 0; i < inicioSemana; i++) {
        celdas.push(<div key={`vacio-${i}`} />);
    }

    // Días del mes
    for (let dia = 1; dia <= totalDias; dia++) {
        const tareas = tareasDelDia(dia);
        const activo = esHoy(dia);
        const seleccionado = esSeleccionado(dia);

        celdas.push(
            <div
                key={dia}
                onClick={() => setDiaSeleccionado(dia)}
                style={{
                    height: "50px",
                    background: seleccionado ? "var(--blue-subtle)" : "var(--bg-card)",
                    border: `0.5px solid ${activo ? "var(--blue-primary)" : seleccionado ? "var(--blue-primary)" : "var(--border-subtle)"}`,
                    borderRadius: "6px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    paddingTop: "6px",
                    cursor: "pointer",
                    transition: "border-color 0.15s",
                }}
            >
                <span style={{
                    fontSize: "11px",
                    fontWeight: activo || seleccionado ? "500" : "400",
                    color: seleccionado ? "#fff" : activo ? "var(--blue-primary)" : "var(--text-secondary)",
                }}>
                    {dia}
                </span>

                {/* Puntitos de urgencia */}
                {tareas.length > 0 && (
                    <div style={{ display: "flex", gap: "2px", marginTop: "4px" }}>
                        {tareas.slice(0, 3).map((t, i) => (
                            <div
                                key={i}
                                style={{
                                    width: "4px",
                                    height: "4px",
                                    borderRadius: "50%",
                                    background: urgenciaColor[t.urgencia] || "#94a3b8",
                                }}
                            />
                        ))}
                    </div>
                )}
            </div>
        );
    }

    return (
        <div style={{ padding: "22px" }}>
            {/* Cabecera mes */}
            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "14px",
            }}>
                <button
                    onClick={mesAnterior}
                    style={{
                        background: "none",
                        border: "0.5px solid var(--border-input)",
                        borderRadius: "6px",
                        color: "var(--text-muted)",
                        cursor: "pointer",
                        padding: "4px 10px",
                        fontSize: "14px",
                    }}
                >
                    ‹
                </button>
                <span style={{ fontSize: "14px", fontWeight: "500", color: "var(--text-primary)" }}>
                    {nombresMes[mes]} {anio}
                </span>
                <button
                    onClick={mesSiguiente}
                    style={{
                        background: "none",
                        border: "0.5px solid var(--border-input)",
                        borderRadius: "6px",
                        color: "var(--text-muted)",
                        cursor: "pointer",
                        padding: "4px 10px",
                        fontSize: "14px",
                    }}
                >
                    ›
                </button>
            </div>

            {/* Nombres días semana */}
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(7, 1fr)",
                gap: "3px",
                marginBottom: "3px",
            }}>
                {diasSemana.map((d) => (
                    <div key={d} style={{
                        fontSize: "10px",
                        color: "var(--text-faint)",
                        textAlign: "center",
                        padding: "3px 0",
                        textTransform: "uppercase",
                    }}>
                        {d}
                    </div>
                ))}
            </div>

            {/* Grid días */}
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(7, 1fr)",
                gap: "3px",
                marginBottom: "16px",
            }}>
                {celdas}
            </div>

            {/* Leyenda */}
            <div style={{ display: "flex", gap: "14px", marginBottom: "16px" }}>
                {Object.entries(urgenciaColor).map(([label, color]) => (
                    <div key={label} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                        <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: color }} />
                        <span style={{ fontSize: "10px", color: "var(--text-muted)" }}>{label}</span>
                    </div>
                ))}
                <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    <div style={{ width: "6px", height: "6px", borderRadius: "50%", border: "1px solid var(--blue-primary)", background: "transparent" }} />
                    <span style={{ fontSize: "10px", color: "var(--text-muted)" }}>Hoy</span>
                </div>
            </div>

            {/* Panel tareas del día */}
            <div style={{
                background: "var(--bg-card)",
                border: "0.5px solid var(--border-subtle)",
                borderRadius: "9px",
                padding: "14px",
            }}>
                <div style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "12px" }}>
                    {diaSeleccionado
                        ? `Tareas del ${diaSeleccionado} de ${nombresMes[mes]}`
                        : "Selecciona un día para ver sus tareas"
                    }
                </div>

                {!diaSeleccionado && (
                    <div style={{ fontSize: "12px", color: "var(--text-faint)", textAlign: "center", padding: "12px 0" }}>
                        —
                    </div>
                )}

                {diaSeleccionado && tareasDiaSeleccionado.length === 0 && (
                    <div style={{ fontSize: "12px", color: "var(--text-faint)", textAlign: "center", padding: "12px 0" }}>
                        Sin tareas para este día
                    </div>
                )}

                {diaSeleccionado && tareasDiaSeleccionado.length > 0 && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                        {tareasDiaSeleccionado.map((tarea) => (
                            <div
                                key={tarea.id}
                                style={{
                                    background: "var(--bg-base)",
                                    border: "0.5px solid var(--border-subtle)",
                                    borderRadius: "7px",
                                    padding: "9px 12px",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "9px",
                                }}
                            >
                                <div style={{ flex: 1, fontSize: "12px", color: "var(--text-primary)" }}>
                                    {tarea.texto}
                                </div>
                                <span style={{
                                    fontSize: "9px",
                                    padding: "1px 7px",
                                    borderRadius: "20px",
                                    fontWeight: "500",
                                    ...urgenciaEstilo[tarea.urgencia]
                                }}>
                                    {tarea.urgencia}
                                </span>
                                <span style={{
                                    fontSize: "9px",
                                    padding: "1px 7px",
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
    );
};

export default Calendario;
"use client";

import { useState, useEffect } from "react";
import { io } from "socket.io-client";

export const Humidity = () => {
    const [humidity, setHumidity] = useState("75%");

    useEffect(() => {
        console.log("Intentando conectar con Socket.IO...");

        // Conecta con el servidor Socket.IO
        const socket = io("http://localhost:3003");

        // Evento cuando la conexión se abre
        socket.on("connect", () => {
            console.log("Conexión Socket.IO abierta, ID:", socket.id);
        });

        // Maneja la recepción de mensajes del evento 'sensors-client:getAll'
        socket.on("sensors-client:getAll", (data) => {
            console.log("Datos recibidos:", data);
            // Actualiza el estado con la humedad recibida
            if (data && data.humidity !== undefined) {
                setHumidity(`${data.humidity}%`);
            }
        });

        // Maneja errores de conexión
        socket.on("connect_error", (error) => {
            console.error("Error en la conexión Socket.IO:", error);
        });

        // Maneja la desconexión
        socket.on("disconnect", () => {
            console.log("Conexión Socket.IO cerrada");
        });

        // Limpia la conexión Socket.IO cuando el componente se desmonta
        return () => {
            console.log("Cerrando conexión Socket.IO...");
            socket.disconnect();
        };
    }, []);

    return (
        <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-2xl font-extrabold text-[#333] bg-gradient-to-r from-[#FF6B6B] to-[#FFA500] bg-clip-text text-transparent">
                Humedad
            </h2>
            <div className="flex items-center justify-between">
                <div className="text-6xl font-extrabold text-[#333]">{humidity}</div>
                <div className="rounded-full bg-[#FFA500] p-3 text-white">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                    </svg>
                </div>
            </div>
            <p className="mt-4 text-[#999]">La humedad actual de la granja.</p>
        </div>
    );
};

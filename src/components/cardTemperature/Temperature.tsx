"use client";

import { useState, useEffect } from "react";
import { io } from "socket.io-client";

export const Temperature = () => {
    const [temperature, setTemperature] = useState("25°C");

    useEffect(() => {
        console.log("Intentando conectar con Socket.IO...");

        const socket = io("http://localhost:3003");

        socket.on("connect", () => {
            console.log("Conexión Socket.IO abierta, ID:", socket.id);
        });

        socket.on("sensors-client:getAll", (data) => {
            console.log("Datos recibidos:", data);
            if (data && data.temperature !== undefined) {
                setTemperature(`${data.temperature}°C`);
            }
        });

        socket.on("connect_error", (error) => {
            console.error("Error en la conexión Socket.IO:", error);
        });

        socket.on("disconnect", () => {
            console.log("Conexión Socket.IO cerrada");
        });

        return () => {
            console.log("Cerrando conexión Socket.IO...");
            socket.disconnect();
        };
    }, []);

    return (
        <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-2xl font-extrabold text-[#333] bg-gradient-to-r from-[#FF6B6B] to-[#FFA500] bg-clip-text text-transparent">
                Temperatura
            </h2>
            <div className="flex items-center justify-between">
                <div className="text-6xl font-extrabold text-[#333]">{temperature}</div>
                <div className="rounded-full bg-[#FF6B6B] p-3 text-white">
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
                            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                    </svg>
                </div>
            </div>
            <p className="mt-4 text-[#999]">La temperatura actual de la granja.</p>
        </div>
    );
};

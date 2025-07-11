"use client";

import { useState, useEffect } from "react";
import Swal from "sweetalert2";

export const Humidity = () => {
    const [humidity, setHumidity] = useState<string | null>(null);
    const [condition, setCondition] = useState("noche");
    const [color, setColor] = useState("#000");

    // Función para generar datos aleatorios
    const generateRandomData = () => {
        const baseHumidity = 65;
        const humidityVariation = (Math.random() - 0.5) * 20;
        const humidity = baseHumidity + humidityVariation;

        const baseLuminosity = 15;
        const luminosityVariation = (Math.random() - 0.5) * 10;
        const luminosity = baseLuminosity + luminosityVariation;

        return {
            humidity: Math.max(0, Math.min(100, humidity)),
            luminosity: Math.max(0, luminosity)
        };
    };

    useEffect(() => {
        // Generar datos iniciales
        const initialData = generateRandomData();
        setHumidity(`${initialData.humidity.toFixed(1)}%`);

        // Establecer condición inicial basada en luminosidad
        if (initialData.luminosity < 5) {
            setCondition("noche");
            setColor("#000");
        } else if (initialData.luminosity <= 20) {
            setCondition("nublado");
            setColor("#9CA3AF");
        } else {
            setCondition("soleado");
            setColor("#FFA500");
        }

        // Actualizar datos cada 5 segundos
        const interval = setInterval(() => {
            const data = generateRandomData();

            // Actualizar humedad
            setHumidity(`${data.humidity.toFixed(1)}%`);

            // Verificar si la humedad es alta
            if (data.humidity > 86) {
                Swal.fire({
                    icon: 'warning',
                    title: '¡Alerta de Humedad Alta!',
                    text: 'La humedad ha superado el 86%. Tome medidas para reducirla.',
                });
            }

            // Actualizar condición basada en luminosidad
            if (data.luminosity < 5) {
                setCondition("noche");
                setColor("#000");
            } else if (data.luminosity <= 20) {
                setCondition("nublado");
                setColor("#9CA3AF");
            } else {
                setCondition("soleado");
                setColor("#FFA500");
            }
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-2xl font-extrabold text-[#333] bg-gradient-to-r from-[#FF6B6B] to-[#FFA500] bg-clip-text text-transparent">
                Humedad
            </h2>
            <div className="flex items-center justify-between">
                <div className="text-6xl font-extrabold text-[#333]">
                    {humidity === null ? "Cargando..." : humidity}
                </div>
                <div className="rounded-full p-3 text-white" style={{ backgroundColor: color }}>
                    {condition === "noche" && (
                        <svg
                            data-testid="moon-icon"
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
                                d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
                            />
                        </svg>
                    )}
                    {condition === "nublado" && (
                        <svg
                            data-testid="cloud-icon"
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
                                d="M3 15a4 4 0 100-8 4 4 0 000 8zm2-2a3 3 0 013-3h6a3 3 0 010 6h-9a3 3 0 01-3-3zm16 0a3 3 0 00-3-3h-1a5 5 0 00-9.33-1.15A4 4 0 013 15h9a3 3 0 006 0z"
                            />
                        </svg>
                    )}
                    {condition === "soleado" && (
                        <svg
                        data-testid="sun-icon" 
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
                    )}
                </div>
            </div>
            <p className="mt-4 text-[#999]">La humedad actual de la granja.</p>
        </div>
    );
};

"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Footer } from "@/components/footer/Footer";
import { Header } from "@/components/header/Header";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    scales: {
        x: {
            title: {
                display: true,
                text: 'Medición',
            },
        },
        y: {
            beginAtZero: true,
            min: 0,
            max: 100, // Ajustar según la escala esperada
            ticks: {
                stepSize: 10,
            },
            title: {
                display: true,
                text: 'Valor Medio',
            },
        },
    },
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Media Acumulada de Temperatura y Humedad',
        },
    },
};

export default function Graphics() {
    const [temperatureAverage, setTemperatureAverage] = useState(0);
    const [humidityAverage, setHumidityAverage] = useState(0);
    let temperatureSum = 0;
    let temperatureCount = 0;
    let humiditySum = 0;
    let humidityCount = 0;

    useEffect(() => {
        const socket = io("http://localhost:3002");

        socket.on("connect", () => {
            console.log("Conectado a Socket.IO");
        });

        socket.on("sensors-client:getAll", (data) => {
            console.log("Datos recibidos:", data);
            if (data) {
                // Actualizar la suma y el contador para temperatura
                temperatureSum += data.temperature;
                temperatureCount += 1;
                setTemperatureAverage(temperatureSum / temperatureCount);

                // Actualizar la suma y el contador para humedad
                humiditySum += data.humidity;
                humidityCount += 1;
                setHumidityAverage(humiditySum / humidityCount);
            }
        });

        socket.on("disconnect", () => {
            console.log("Desconectado de Socket.IO");
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <div className="flex min-h-screen flex-col bg-gradient-to-r from-[#FF6B6B] to-[#FFA500]">
            <Header />
            <div className="flex flex-1 items-center justify-center py-8">
                <div className="container mx-auto px-4 flex justify-center">
                    <div className="rounded-lg bg-white p-12 shadow-md text-black max-w-4xl w-full">
                        <Bar
                            data={{
                                labels: ['Temperatura Media (°C)', 'Humedad Media (%)'],
                                datasets: [
                                    {
                                        label: 'Media',
                                        data: [temperatureAverage, humidityAverage],
                                        backgroundColor: [
                                            'rgba(75, 192, 192, 0.2)',
                                            'rgba(153, 102, 255, 0.2)',
                                        ],
                                        borderColor: [
                                            'rgb(75, 192, 192)',
                                            'rgb(153, 102, 255)',
                                        ],
                                        borderWidth: 1,
                                    },
                                ],
                            }}
                            options={options}
                        />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
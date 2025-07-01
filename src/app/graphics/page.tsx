"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/utils/auth";
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
            max: 100,
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
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Media Acumulada de Temperatura y Humedad',
        },
    },
};

export default function Graphics() {
    // Verificar autenticación
    useAuth();

    const [temperatureAverage, setTemperatureAverage] = useState(30);
    const [humidityAverage, setHumidityAverage] = useState(65);
    const [temperatureSum, setTemperatureSum] = useState(0);
    const [temperatureCount, setTemperatureCount] = useState(0);
    const [humiditySum, setHumiditySum] = useState(0);
    const [humidityCount, setHumidityCount] = useState(0);

    // Función para generar datos aleatorios
    const generateRandomData = () => {
        const baseTemp = 30;
        const tempVariation = (Math.random() - 0.5) * 10;
        const temperature = baseTemp + tempVariation;

        const baseHumidity = 65;
        const humidityVariation = (Math.random() - 0.5) * 20;
        const humidity = baseHumidity + humidityVariation;

        return {
            temperature: Math.max(0, temperature),
            humidity: Math.max(0, Math.min(100, humidity))
        };
    };

    useEffect(() => {
        // Generar datos iniciales
        const initialData = generateRandomData();
        setTemperatureSum(initialData.temperature);
        setTemperatureCount(1);
        setTemperatureAverage(initialData.temperature);

        setHumiditySum(initialData.humidity);
        setHumidityCount(1);
        setHumidityAverage(initialData.humidity);

        // Actualizar datos cada 3 segundos
        const interval = setInterval(() => {
            const data = generateRandomData();

            // Actualizar temperatura
            const newTempSum = temperatureSum + data.temperature;
            const newTempCount = temperatureCount + 1;
            setTemperatureSum(newTempSum);
            setTemperatureCount(newTempCount);
            setTemperatureAverage(newTempSum / newTempCount);

            // Actualizar humedad
            const newHumSum = humiditySum + data.humidity;
            const newHumCount = humidityCount + 1;
            setHumiditySum(newHumSum);
            setHumidityCount(newHumCount);
            setHumidityAverage(newHumSum / newHumCount);
        }, 3000);

        return () => clearInterval(interval);
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
import {useEffect, useState} from "react";

export const simulateSensors = () => {
    const baseTemperature = 30;
    const baseHumidity = 65;
    const baseLuminosity = 15;

    // Generar valores aleatorios con variaciones realistas
    const temperature = baseTemperature + (Math.random() - 0.5) * 10;
    const humidity = baseHumidity + (Math.random() - 0.5) * 20;
    const luminosity = baseLuminosity + (Math.random() - 0.5) * 10;

    return {
        temperature: Number(temperature.toFixed(1)),
        humidity: Number(humidity.toFixed(1)),
        luminosity: Number(luminosity.toFixed(1))
    };
};

export const useSimulatedSensors = (interval: number = 5000) => {
    const [data, setData] = useState(simulateSensors());

    useEffect(() => {
        const timer = setInterval(() => {
            setData(simulateSensors());
        }, interval);

        return () => clearInterval(timer);
    }, [interval]);

    return data;
};
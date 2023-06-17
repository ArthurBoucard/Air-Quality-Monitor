import { defineStore } from "pinia";

export const useWeatherStore = defineStore("weather", () => {
    const backendPath = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";

    async function getCurrentTemperature(): Promise<number> {
        const path = `${backendPath}/weather`;

        const response = await fetch(path, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        let payload = await response.json();

        return payload.current_weather.temperature;
    }

    return {
        getCurrentTemperature,
    }
});

import { defineStore } from "pinia";
import type { QualityTimestamp } from "@/types/QualityTimestamp";

export const useAirQualityStore = defineStore("airQuality", () => {
    const backendPath = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";

    async function getAirQuality(): Promise<QualityTimestamp[]> {
        const path = `${backendPath}/measurements/get/all`;

        const response = await fetch(path, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return await response.json();
    }

    return {
        getAirQuality,
    }
});

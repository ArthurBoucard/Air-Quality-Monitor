<template>
    <div class="text-3xl">
        Air Quality
    </div>


    <div class="mt-12 text-2xl">
        Your air quality score:
        <div v-if="dummyIAQValues" class="underline">
            <!-- Score -->
            {{dummyIAQValues[dummyIAQValues.length - 1].value}}
        </div>
        <hr/>
    </div>

    <div class="text-2xl">
        The current outdoor temperature is:
        <span class=" underline">
            {{ weather }} C°
        </span>
        <div v-if="weather > tempData.datasets[0].data[tempData.datasets[0].data.length - 1]">
            The outside temperature is warmer than indoors,<br/> close your windows to cool down your room.
        </div>
        <div v-else>
            The indoor temperature is warmer than outdoors,<br/> open your windows to cool down your room.
        </div>
        <hr/>
    </div>


    <div class="grid grid-cols-2 space-y-10 ">
        <div>
            <div class=" text-2xl">
                CO2
            </div>
            <!-- Graphique CO2 -->
            <div class="w-full">
                  <Bar
                        id="CO2-chart"
                        :options="{
                            responsive: true
                        }"
                        :data="CO2Data"
                    />
            </div>
        </div>

        <div>
            <div class=" text-2xl">
                Temperature
            </div>
            <!-- Graphique Temperature -->
            <div class="w-full">
                <Bar
                    id="Temp-chart"
                    :options="{
                        responsive: true
                    }"
                    :data="tempData"
                />
            </div>
        </div>

        <div>
            <div class=" text-2xl">
                Humidity
            </div>
            <!-- Graphique Humidity -->
            <div class="w-full">
                <Bar
                    id="Humidity-chart"
                    :options="{
                        responsive: true
                    }"
                    :data="humidityData"
                />
            </div>
        </div>

        <div>
            <div class=" text-2xl">
                Pressure
            </div>
            <!-- Graphique Pressure -->
            <div class="w-full">
                <Bar
                    id="Pressure-chart"
                    :options="{
                        responsive: true
                    }"
                    :data="pressureData"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { ref, defineComponent, onMounted } from 'vue';
import type { QualityTimestamp } from "@/types/QualityTimestamp";
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import sample_temp from "@/sample_data/temp.json";
import sample_co2 from "@/sample_data/co2.json";
import sample_humidity from "@/sample_data/humidity.json";
import sample_pressure from "@/sample_data/pressure.json";
import sample_iaq from "@/sample_data/iaq.json";
import { useWeatherStore } from '@/stores/weather';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

var dummyCO2Values = ref([] as QualityTimestamp[]);
var dummyTempValues = ref([] as QualityTimestamp[]);
var dummyHumidityValues = ref([] as QualityTimestamp[]);
var dummyPressureValues = ref([] as QualityTimestamp[]);

var weatherStore = null;

let weather = ref(0);

var dummyIAQValues = ref([] as QualityTimestamp[]);
dummyIAQValues.value = JSON.parse(JSON.stringify(sample_iaq));
dummyIAQValues.value.map((value) => {
    value.time = new Date(value.time);
    return value;
});

dummyTempValues.value = JSON.parse(JSON.stringify(sample_temp));
dummyTempValues.value.map((value) => {
    value.time = new Date(value.time);
    return value;
});

dummyCO2Values.value = JSON.parse(JSON.stringify(sample_co2));
dummyCO2Values.value.map((value) => {
    value.time = new Date(value.time);
    return value;
});

dummyHumidityValues.value = JSON.parse(JSON.stringify(sample_humidity));
dummyHumidityValues.value.map((value) => {
    value.time = new Date(value.time);
    return value;
});

dummyPressureValues.value = JSON.parse(JSON.stringify(sample_pressure));
dummyPressureValues.value.map((value) => {
    value.time = new Date(value.time);
    return value;
});


const getChartData = (valuesArray: QualityTimestamp[], chartLabel:string, lowRange: number, highRange: number, lowColor: string, highColor: string) => {
    const labels = valuesArray.map((value) => value.time.toLocaleTimeString());
    // array of colours from values, red if value is < 25 or > 75, green if not

    const colors = valuesArray.map((value) => {
        if (value.value < lowRange) {
            return lowColor;
        } else if (value.value > highRange) {
            return highColor;
        } else {
            // return green by default
            return '#41b883';
        }
    });

    const datasets = [
        {
            label: chartLabel,
            data: valuesArray.map((value) => value.value),
            backgroundColor: colors
        }
    ];

    return {
        labels,
        datasets,
    }
}

const CO2Data = ref(getChartData(dummyCO2Values.value, 'CO2', 0, 1000, '#f87979', '#f87979'));
const tempData = ref(getChartData(dummyTempValues.value, 'Temperature', 12, 30, '#f87979', '#f87979'));
const humidityData = ref(getChartData(dummyHumidityValues.value, 'Humidity', 30, 60, '#f87979', '#f87979'));
const pressureData = ref(getChartData(dummyPressureValues.value, 'Pressure', 0, 10000, '#f87979', '#f87979'));

console.log(tempData.value);

export default defineComponent({
  name: 'AirQualityPage',
  components: { Bar },
    setup() {
        return {
        dummyCO2Values,
        CO2Data,
        tempData,
        humidityData,
        pressureData,
        dummyIAQValues,

        weatherStore,
        weather,
        }
    },
    async mounted() {
        weatherStore = useWeatherStore();
        // weather.value = await weatherStore.getCurrentTemperature();
        weather.value = 21.2;

        // ici appeler le store pour récupérer les données individuelles

        // convertir les dates en Date
        // dummyHumidityValues.value.map((value) => {
        //     value.time = new Date(value.time);
        //     return value;
        // }); 

        // créer les data avec getChartData
    },
});


</script>
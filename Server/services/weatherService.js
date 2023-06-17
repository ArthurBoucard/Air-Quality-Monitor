class WeatherService {

    async getWeather() {
        // trekroner 58.06, 7.98
        const url = "https://api.open-meteo.com/v1/forecast?latitude=58.06&longitude=7.98&hourly=temperature_2m&daily=weathercode,sunrise,sunset&current_weather=true&timezone=Europe%2FBerlin";

        const response = await fetch(url);

        const data = await response.json();

        // maybe just return today/now

        return data;
    }
}

module.exports = new WeatherService();

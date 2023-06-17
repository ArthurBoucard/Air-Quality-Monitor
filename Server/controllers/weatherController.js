const weatherService = require('../services/weatherService');

class WeatherController {
    async getCurrentWeather(req, res) {
        try {
            const weather = await weatherService.getCurrentWeather();
            res.json(weather);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

module.exports = new WeatherController();

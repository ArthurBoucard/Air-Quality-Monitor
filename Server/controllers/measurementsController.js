const measurementsService = require('../services/measurementsService');

class MeasurementsController {
    async createMeasurement(req, res) {
        try {
            const { temperature, pressure, gas, co2, humidity, iaq } = req.body;
        
            const measurementData = {
                temperature,
                pressure,
                gas,
                co2,
                humidity,
                iaq
            };
        
            await measurementsService.createMeasurement(measurementData);
            res.sendStatus(201);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async getAllMeasurements(req, res) {
        try {
            const measurements = await measurementsService.getAllMeasurements();
            res.json(measurements);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

module.exports = new MeasurementsController();

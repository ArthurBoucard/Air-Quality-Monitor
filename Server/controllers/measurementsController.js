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

    async getCo2Measurements(req, res) {
        try {
            const measurements = await measurementsService.getCo2Measurements();
            res.json(measurements);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async getTemperatureMeasurements(req, res) {
        try {
            const measurements = await measurementsService.getTemperatureMeasurements();
            res.json(measurements);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async getHumidityMeasurements(req, res) {
        try {
            const measurements = await measurementsService.getHumidityMeasurements();
            res.json(measurements);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async getPressureMeasurements(req, res) {
        try {
            const measurements = await measurementsService.getPressureMeasurements();
            res.json(measurements);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async getGasMeasurements(req, res) {
        try {
            const measurements = await measurementsService.getGasMeasurements();
            res.json(measurements);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async getIaqMeasurements(req, res) {
        try {
            const measurements = await measurementsService.getIaqMeasurements();
            res.json(measurements);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

module.exports = new MeasurementsController();

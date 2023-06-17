const MeasurementsModel = require('../models/measurementsModel');
const dbConnection = require('../config/dbConfig');

class MeasurementsService {

    async createMeasurement(measurementData) {
        try {
            const { time, temperature, pressure, gas, co2, humidity, iaq } = measurementData;
    
            const query = `INSERT INTO measurements (time, temperature, pressure, gas, co2, humidity, iaq) VALUES (NOW(), ?, ?, ?, ?, ?, ?)`;
    
            const values = [temperature, pressure, gas, co2, humidity, iaq];
    
            await dbConnection.query(query, { replacements: values });
            return;
        } catch (error) {
            throw new Error('Failed to create measurement');
        }
    }

    async getAllMeasurements() {
        try {
            const query = `SELECT * FROM measurements`;

            const [measurements] = await dbConnection.query(query);

            return measurements;
        } catch (error) {
            throw new Error('Failed to get measurements');
        }
    }

    async getCo2Measurements() {
        try {
            const query = `SELECT co2, time FROM measurements`;

            const [rows] = await dbConnection.query(query);

            const measurements = rows.map(row => {
                return {
                    time: row.time,
                    value: row.co2
                };
            });

            return measurements;
        } catch (error) {
            throw new Error('Failed to get measurements');
        }
    }

    async getTemperatureMeasurements() {
        try {
            const query = `SELECT temperature, time FROM measurements`;

            const [rows] = await dbConnection.query(query);

            const measurements = rows.map(row => {
                return {
                    time: row.time,
                    value: row.temperature
                };
            });

            return measurements;
        } catch (error) {
            throw new Error('Failed to get measurements');
        }
    }

    async getHumidityMeasurements() {
        try {
            const query = `SELECT humidity, time FROM measurements`;

            const [rows] = await dbConnection.query(query);

            const measurements = rows.map(row => {
                return {
                    time: row.time,
                    value: row.humidity
                };
            });

            return measurements;
        } catch (error) {
            throw new Error('Failed to get measurements');
        }
    }

    async getPressureMeasurements() {
        try {
            const query = `SELECT pressure, time FROM measurements`;

            const [rows] = await dbConnection.query(query);

            const measurements = rows.map(row => {
                return {
                    time: row.time,
                    value: row.pressure
                };
            });

            return measurements;
        } catch (error) {
            throw new Error('Failed to get measurements');
        }
    }

    async getGasMeasurements() {
        try {
            const query = `SELECT gas, time FROM measurements`;

            const [rows] = await dbConnection.query(query);

            const measurements = rows.map(row => {
                return {
                    time: row.time,
                    value: row.gas
                };
            });

            return measurements;
        } catch (error) {
            throw new Error('Failed to get measurements');
        }
    }

    async getIaqMeasurements() {
        try {
            const query = `SELECT iaq, time FROM measurements`;

            const [rows] = await dbConnection.query(query);

            const measurements = rows.map(row => {
                return {
                    time: row.time,
                    value: row.iaq
                };
            });

            return measurements;
        } catch (error) {
            throw new Error('Failed to get measurements');
        }
    }
}

module.exports = new MeasurementsService();

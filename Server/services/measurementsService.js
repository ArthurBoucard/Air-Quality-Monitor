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
            const query = `SELECT co2 FROM measurements`;

            const [measurements] = await dbConnection.query(query);

            return measurements;
        } catch (error) {
            throw new Error('Failed to get measurements');
        }
    }

    async getTemperatureMeasurements() {
        try {
            const query = `SELECT temperature FROM measurements`;

            const [measurements] = await dbConnection.query(query);

            return measurements;
        } catch (error) {
            throw new Error('Failed to get measurements');
        }
    }

    async getHumidityMeasurements() {
        try {
            const query = `SELECT humidity FROM measurements`;

            const [measurements] = await dbConnection.query(query);

            return measurements;
        } catch (error) {
            throw new Error('Failed to get measurements');
        }
    }

    async getPressureMeasurements() {
        try {
            const query = `SELECT pressure FROM measurements`;

            const [measurements] = await dbConnection.query(query);

            return measurements;
        } catch (error) {
            throw new Error('Failed to get measurements');
        }
    }

    async getGasMeasurements() {
        try {
            const query = `SELECT gas FROM measurements`;

            const [measurements] = await dbConnection.query(query);

            return measurements;
        } catch (error) {
            throw new Error('Failed to get measurements');
        }
    }

    async getIaqMeasurements() {
        try {
            const query = `SELECT iaq FROM measurements`;

            const [measurements] = await dbConnection.query(query);

            return measurements;
        } catch (error) {
            throw new Error('Failed to get measurements');
        }
    }
}

module.exports = new MeasurementsService();

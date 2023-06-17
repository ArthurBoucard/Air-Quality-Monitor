const express = require('express');
const measurementsController = require('../controllers/measurementsController');

const router = express.Router();

router.post('/create', measurementsController.createMeasurement);
router.get('/get/all', measurementsController.getAllMeasurements);
router.get('/get/co2', measurementsController.getCo2Measurements);
router.get('/get/temperature', measurementsController.getTemperatureMeasurements);
router.get('/get/humidity', measurementsController.getHumidityMeasurements);
router.get('/get/pressure', measurementsController.getPressureMeasurements);
router.get('/get/gas', measurementsController.getGasMeasurements);
router.get('/get/iaq', measurementsController.getIaqMeasurements);

module.exports = router;

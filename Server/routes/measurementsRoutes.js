const express = require('express');
const measurementsController = require('../controllers/measurementsController');

const router = express.Router();

router.post('/create', measurementsController.createMeasurement);
router.get('/get-all', measurementsController.getAllMeasurements);

module.exports = router;

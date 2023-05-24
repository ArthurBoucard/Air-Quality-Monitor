CREATE DATABASE air_quality_monitor;

USE air_quality_monitor;

CREATE TABLE measurements (
  id INT AUTO_INCREMENT PRIMARY KEY,
  timestamp TIMESTAMP,
  temperature FLOAT,
  pressure FLOAT,
  gas FLOAT,
  co2 FLOAT,
  humidity FLOAT,
  air_quality_index FLOAT
);

CREATE DATABASE air_quality_monitor;

USE air_quality_monitor;

CREATE TABLE measurements (
  id INT AUTO_INCREMENT PRIMARY KEY,
  time TIMESTAMP,
  temperature FLOAT,
  pressure FLOAT,
  gas FLOAT,
  co2 FLOAT,
  humidity FLOAT,
  iaq FLOAT
);

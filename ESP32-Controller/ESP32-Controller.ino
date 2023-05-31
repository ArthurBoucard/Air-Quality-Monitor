#include <Wire.h>
#include <WiFi.h>
#include <SPI.h>
#include <HTTPClient.h>
#include <Adafruit_Sensor.h>
#include "Adafruit_BME680.h"
#include "secrets.h"


// BME680 pins
#define BME_SCK 18
#define BME_MISO 19
#define BME_MOSI 23
#define BME_CS 5

#define CONNECTION_TIMEOUT 10

Adafruit_BME680 bme(BME_CS, BME_MOSI, BME_MISO,  BME_SCK);

// Server info
const char* serverUrl = "http://192.168.1.104:3000/measurements/create";

// Weight attribution
const float HumidityWeight = 0.4;
const float VOCWeight = 0.3;
const float TemperatureWeight = 0.2;
const float PressureWeight = 0.1;

void setup() {
  Serial.begin(115200);
  while (!Serial);

  // Connect to WiFi
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.println("\nConnecting to WiFi");
  int timeout_counter = 0;

  while(WiFi.status() != WL_CONNECTED){
    Serial.print(".");
    delay(200);
    timeout_counter++;
    if(timeout_counter >= CONNECTION_TIMEOUT*5){
      ESP.restart();
    }
  }

  Serial.println("\nConnected to the WiFi network");

  // Check sensors
  if (!bme.begin()) {
    Serial.println("Could not find a valid BME680 sensor, check wiring!");
    while (1);
  }

  // Set up oversampling and filter initialization
  bme.setTemperatureOversampling(BME680_OS_8X);
  bme.setHumidityOversampling(BME680_OS_2X);
  bme.setPressureOversampling(BME680_OS_4X);
  bme.setIIRFilterSize(BME680_FILTER_SIZE_3);
  bme.setGasHeater(320, 150); // 320*C for 150 ms
}

void loop() {
  if (!bme.performReading()) {
    Serial.println("Failed to perform reading :(");
    return;
  }

  Serial.print("Temperature = ");
  Serial.print(bme.temperature);
  Serial.println(" *C");

  Serial.print("Pressure = ");
  Serial.print(bme.pressure / 100.0);
  Serial.println(" hPa");

  Serial.print("Humidity = ");
  Serial.print(bme.humidity);
  Serial.println(" %");

  Serial.print("Gas = ");
  Serial.print(bme.gas_resistance * 0.001);
  Serial.println(" KOhms");

  // Calculate normalized values
  float normalizedHumidity = bme.humidity / 100.0;
  float normalizedVOC = (bme.gas_resistance * 0.001 - 0) / (500 - 0);
  float normalizedTemperature = (bme.temperature - (-10)) / (40 - 0);
  float normalizedPressure = (bme.pressure / 100.0 - 900) / (1100 - 900);

  // Calculate IAQ score
  float iaqScore = (HumidityWeight * normalizedHumidity) + (VOCWeight * normalizedVOC) +
                   (TemperatureWeight * normalizedTemperature) + (PressureWeight * normalizedPressure);

  Serial.print("IAQ Score = ");
  Serial.println(iaqScore);

  // Create the HTTP client object and set the target URL + content type
  HTTPClient http;
  http.begin(serverUrl);
  http.addHeader("Content-Type", "application/json");

  // Create the JSON payload
  String payload = "{\"temperature\":" + String(bme.temperature) +
                  ",\"pressure\":" + String(bme.pressure / 100.0) +
                  ",\"humidity\":" + String(bme.humidity) +
                  ",\"gas\":" + String(bme.gas_resistance * 0.001) +
                  ",\"co2\": 0" +
                  ",\"iaq\":" + String(iaqScore) +
                  "}";

  // Send the POST request with the payload
  int httpResponseCode = http.POST(payload);

  // Check the response code
  if (httpResponseCode == 201) {
    String response = http.getString();
    Serial.println("HTTP POST request successful. Response:");
    Serial.println(response);
  } else {
    Serial.print("Error: ");
    Serial.println(httpResponseCode);
  }

  // Clean up
  http.end();

  Serial.println();
  delay(2000);
}

#include <Wire.h>
#include <WiFi.h>
#include <SPI.h>
#include <HTTPClient.h>
#include <esp_task_wdt.h>
#include <Adafruit_Sensor.h>
#include "Adafruit_BME680.h"
#include "secrets.h"

#define CONNECTION_TIMEOUT 10
#define WATCHDOG_TIMEOUT_MS 90000

// BME680 pins
#define BME_SCK 18
#define BME_MISO 19
#define BME_MOSI 23
#define BME_CS 5

Adafruit_BME680 bme(BME_CS, BME_MOSI, BME_MISO,  BME_SCK);

// Gravity Infrared CO2 Sensor pins
#define SENSOR_DATA_PIN 13
#define INTERRUPT_NUMBER digitalPinToInterrupt(SENSOR_DATA_PIN)

// Used in interrupt, calculate pulse width variable
volatile unsigned long pwm_high_start_ticks=0, pwm_high_end_ticks=0;
volatile unsigned long pwm_high_val=0, pwm_low_val=0;
// interrupt flag
volatile uint8_t flag=0;

// Weight attribution
const float HumidityWeight = 0.4;
const float VOCWeight = 0.3;
const float TemperatureWeight = 0.2;
const float CO2Weight = 0.2;
const float PressureWeight = 0.1;

// Server info
String serverUrl = "http://" + String(SERVER_IP) + "/measurements/create";

void interrupt_change()
{
  if (digitalRead(SENSOR_DATA_PIN)) {
    pwm_high_start_ticks = micros();
    if (2 == flag) {
      flag = 4;
      if(pwm_high_start_ticks > pwm_high_end_ticks) {
        pwm_low_val = pwm_high_start_ticks - pwm_high_end_ticks;
      }
    } else {
      flag = 1;
    }
  } else {
    pwm_high_end_ticks = micros();
    if (1 == flag) {
      flag = 2;
      if (pwm_high_end_ticks > pwm_high_start_ticks) {
        pwm_high_val = pwm_high_end_ticks - pwm_high_start_ticks;
      }
    }
  }
}

void setup() {
  Serial.begin(115200);
  while (!Serial);
  
  // Initialize the watchdog timer
  esp_task_wdt_init(WATCHDOG_TIMEOUT_MS, true);

  pinMode(SENSOR_DATA_PIN, INPUT);
  attachInterrupt(INTERRUPT_NUMBER, interrupt_change, CHANGE);

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
  // Reset the watchdog timer
  esp_task_wdt_reset();

  if (!bme.performReading()) {
    Serial.println("BME680 failed to perform reading :");
    return;
  }

  Serial.print("Temperature = ");
  Serial.print(bme.temperature);
  Serial.println(" *C");
  float temperature = bme.temperature;

  Serial.print("Pressure = ");
  Serial.print(bme.pressure / 100.0);
  Serial.println(" hPa");
  float pressure = bme.pressure / 100.0;

  Serial.print("Humidity = ");
  Serial.print(bme.humidity);
  Serial.println(" %");
  float humidity = bme.humidity;

  Serial.print("Gas = ");
  Serial.print(bme.gas_resistance * 0.001);
  Serial.println(" KOhms");
  float gas = bme.gas_resistance * 0.001;

  float co2 = -1;
  float iaqScore = -1;

  // Gravity Infrared CO2 Sensor output
  if (flag == 4) {
    flag = 1;
    float pwm_high_val_ms = (pwm_high_val * 1000.0) / (pwm_low_val + pwm_high_val);

    if (pwm_high_val_ms < 0.01) {
      Serial.println("Fault");
    }
    else if (pwm_high_val_ms < 80.00) {
      Serial.println("preheating");
    }
    else if (pwm_high_val_ms < 998.00) {
      float concentration = (pwm_high_val_ms - 2) * 5;
      // Print pwm_high_val_ms
      Serial.print("pwm_high_val_ms = ");
      Serial.print(pwm_high_val_ms);
      Serial.println("ms");
      //Print CO2 concentration
      Serial.print("CO2 concentration = ");
      Serial.print(concentration);
      Serial.println("ppm");
      co2 = concentration;
    } else {
      Serial.println("Beyond the maximum range : 398~4980ppm");
    }
  }
  
  // Verify all values are collected
  if (temperature != -1 && pressure != -1 && humidity != -1 && gas != -1 && co2 != -1) {

    // Reset the watchdog timer
    esp_task_wdt_reset();

    // Calculate normalized values
    float normalizedHumidity = (humidity - 0) / (100 - 0);
    float normalizedVOC = (gas - 0) / (500 - 0);
    float normalizedTemperature = (temperature - 0) / (50 - 0);
    float normalizedPressure = (pressure - 900) / (1100 - 900);
    float normalizedCO2 = (co2 - 400) / (5000 - 400);

    // Calculate IAQ score
    iaqScore = (HumidityWeight * normalizedHumidity) + (VOCWeight * normalizedVOC) + (CO2Weight * normalizedCO2) +
                    (TemperatureWeight * normalizedTemperature) + (PressureWeight * normalizedPressure);

    Serial.print("IAQ Score = ");
    Serial.println(iaqScore);

    // Create the HTTP client object and set the target URL + content type
    HTTPClient http;
    http.begin(serverUrl);
    http.addHeader("Content-Type", "application/json");

    // Create the JSON payload
    String payload = "{\"temperature\":" + String(temperature) +
                    ",\"pressure\":" + String(pressure) +
                    ",\"humidity\":" + String(humidity) +
                    ",\"gas\":" + String(gas) +
                    ",\"co2\": " + String(co2) +
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
      Serial.print("HTTP error: ");
      Serial.println(httpResponseCode);
    }

    // Clean up
    http.end();

    // Reset all values
    temperature = -1;
    pressure = -1;
    humidity = -1;
    gas = -1;
    co2 = -1;
  }

  Serial.println();
  delay(60000);
}

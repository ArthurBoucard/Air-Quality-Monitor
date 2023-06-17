#! /usr/bin/python3


# read a json file
import json

temp = []
pressure = []
gas = []
co2 = []
humidity = []
iaq = []

# read local file
with open("sample-data.json") as f:
    data = json.load(f)
    # print 10 last items
    for sample in data:
        temp.append({
            "time": sample["time"],
            "value": sample["temperature"],
        })
        pressure.append(
            {
                "time": sample["time"],
                "value": sample["pressure"],
            }
        )
        gas.append(
            {
                "time": sample["time"],
                "value": sample["gas"],
            }
        )
        co2.append(
            {
                "time": sample["time"],
                "value": sample["co2"],
            }
        )
        humidity.append(
            {
                "time": sample["time"],
                "value": sample["humidity"],
            }
        )
        iaq.append(
            {
                "time": sample["time"],
                "value": sample["iaq"],
            }
        )

# write each list to a json file
with open("temp.json", "w") as f:
    json.dump(temp, f)
with open("pressure.json", "w") as f:
    json.dump(pressure, f)
with open("gas.json", "w") as f:
    json.dump(gas, f)
with open("co2.json", "w") as f:
    json.dump(co2, f)
with open("humidity.json", "w") as f:
    json.dump(humidity, f)
with open("iaq.json", "w") as f:
    json.dump(iaq, f)

# data = json.loads('{"one" : "1", "two" : "2", "three" : "3"}')
# print(data['two'])  # or `print data['two']` in Python 2

# simulate_sensors.py
import requests, time, random
BACKEND = "http://localhost:4000"
ROAD = "road-1"
def send():
    payload = {
        "sensorId":"sim-1",
        "distance1": random.choice([18,22,35,60,120]),
        "distance2": random.choice([20,25,40,80,150]),
        "mq_raw": random.randint(120,420),
        "mq_pct": random.uniform(10,80)
    }
    r = requests.post(f"{BACKEND}/api/sensor/{ROAD}", json=payload, timeout=3)
    print(r.status_code, r.text)
if __name__ == "__main__":
    while True:
        send(); time.sleep(1.4)


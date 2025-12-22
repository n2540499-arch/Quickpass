// // ---- Vehicle Allowed Codes ----
// const emergencyCodes = ["EM100", "EM200", "AMBULANCE1"];
// const normalCodes = ["NR501", "NR777", "CAR102"];

// // ---- Submit: Emergency ----
// function submitEmergency() {
//     let code = document.getElementById("emCode").value;

//     if (emergencyCodes.includes(code)) {
//         document.getElementById("emDirection").innerText = "Direction: RIGHT ✓";
//         sendToESP32("emergency");
//     } else {
//         alert("Invalid Emergency Code!");
//     }
// }

// // ---- Submit: Normal ----
// function submitNormal() {
//     let code = document.getElementById("nmCode").value;

//     if (normalCodes.includes(code)) {
//         document.getElementById("nmDirection").innerText = "Direction: LEFT ✓";
//         sendToESP32("normal");
//     } else {
//         alert("Invalid Vehicle Code!");
//     }
// }

// // ---- Send Signal to ESP32 (Turns LED On) ----
// function sendToESP32(type) {
//     fetch("http://192.168.4.1/update", {
//         method: "POST",
//         headers: {"Content-Type": "application/json"},
//         body: JSON.stringify({vehicle: type})
//     });
// }

// // ---- Refresh Sensor Data ----
// function refreshData() {
//     fetch("http://192.168.4.1/sensors")
//         .then(res => res.json())
//         .then(data => {
//             document.getElementById("roadID").innerText = data.road;
//             document.getElementById("congestion").innerText = data.congestion;
//             document.getElementById("pollution").innerText = data.pollution + "%";
//             document.getElementById("weather").innerText = data.weather;
//         })
//         .catch(err => alert("Cannot connect to ESP32!"));
// }



<script>
// ---- Vehicle Allowed Codes ----
const emergencyCodes = ["EM100", "EM200", "AMBULANCE1"];
const normalCodes = ["NR501", "NR777", "CAR102"];

// ---- Submit: Emergency ----
function submitEmergency() {
    let code = document.getElementById("emCode").value;

    if (emergencyCodes.includes(code)) {
        document.getElementById("emDirection").innerText = "Direction: RIGHT ✓";

        firebase.database().ref("vehicle").set({
            type: "emergency",
            allowed: true
        });
    } else {
        alert("Invalid Emergency Code!");
    }
}

// ---- Submit: Normal ----
function submitNormal() {
    let code = document.getElementById("nmCode").value;

    if (normalCodes.includes(code)) {
        document.getElementById("nmDirection").innerText = "Direction: LEFT ✓";

        firebase.database().ref("vehicle").set({
            type: "normal",
            allowed: true
        });
    } else {
        alert("Invalid Vehicle Code!");
    }
}

// ---- Read Sensor Data from Firebase ----
function refreshData() {
    firebase.database().ref("sensors").on("value", snapshot => {
        const data = snapshot.val();

        if (data) {
            document.getElementById("roadID").innerText = data.road;
            document.getElementById("congestion").innerText = data.congestion;
            document.getElementById("pollution").innerText = data.pollution + "%";
            document.getElementById("weather").innerText = data.weather;
        }
    });
}

// Auto load sensor data
refreshData();
</script>

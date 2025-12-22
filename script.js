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


<!-- Firebase SDK -->
<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-database-compat.js"></script>

<script>
  const firebaseConfig = {
  apiKey: "AIzaSyBj8DWZlVpfzxt5lyekuG6CPT5a15VPwzM",
  authDomain: "nada-8cd8f.firebaseapp.com",
  databaseURL: "https://nada-8cd8f-default-rtdb.firebaseio.com",
  projectId: "nada-8cd8f",
  storageBucket: "nada-8cd8f.firebasestorage.app",
  messagingSenderId: "317428055796",
  appId: "1:317428055796:web:296d243c885b8152eda8a1",
  measurementId: "G-4D6Y5F7X95"
  };

  firebase.initializeApp(firebaseConfig);
  const database = firebase.database();
</script>

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


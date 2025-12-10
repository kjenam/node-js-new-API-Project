// server1/index.js
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send(`
    <h1>CORS Demonstration</h1>

    <button id="noCorsBtn">Fetch from Server 2 (CORS FAIL)</button>
    <button id="withCorsBtn">Fetch from Server 3 (CORS PASS)</button>

    <script>
      document.getElementById("noCorsBtn").onclick = async () => {
        try {
          const res = await fetch("http://localhost:8000/data");
          const data = await res.json();
          console.log("Server 2 Response:", data);
        } catch (err) {
          console.error("❌ CORS ERROR:", err);
        }
      };

      document.getElementById("withCorsBtn").onclick = async () => {
        try {
          const res = await fetch("http://localhost:7000/data");
          const data = await res.json();
          console.log("Server 3 Response:", data);
        } catch (err) {
          console.error("Unexpected ERROR:", err);
        }
      };
    </script>
  `);
});

app.listen(3000, () => {
  console.log("Server 1 running on port 3000 (FRONTEND UI)");
});

const express = require("express");
const app = express();
const axios = require("axios");
const path = require("path");
app.use(express.static("public"));

app.get("/cdn/*", async (req, res) => {
  const filePath = req.params[0];
  const cdnUrl = `https://glcdn.githack.com/3kh0/3kh0-assets/-/raw/main/${filePath}`;

  try {
    // Fetch the file from the CDN
    const response = await axios.get(cdnUrl, {
      responseType: "stream", // Ensures data is streamed directly
    });

    // Set the appropriate headers
    res.set(response.headers);

    // Pipe the file stream to the client
    response.data.pipe(res);
  } catch (error) {
    console.error("Error fetching file:", error.message);
    res.status(500).send("Error fetching file");
  }
});

app.get("/game/:root", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "game.html"));
});

app.listen(3000);

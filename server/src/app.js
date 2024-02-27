const express = require("express");
const config = require("config");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(process.cwd() + "/public"));
const PORT = config.get("port") || 4000;

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/ads", require("./routes/ads.routes"));
app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}... `);
});

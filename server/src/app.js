const express = require("express");
const config = require("config");
const cors = require("cors");

const PORT = config.get("port") || 4001;

const app = express();

app.use("/api/auth", require("./routes/auth.routes"));

app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}... `);
});

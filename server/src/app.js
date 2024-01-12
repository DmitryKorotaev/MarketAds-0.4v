const express = require("express");
const config = require("config");
const cors = require("cors");

const PORT = config.get("port") || 4001;
app.use(express.json());

const app = express();

app.use("/api/auth", require("./routes/register.routes"));
app.use("/api/auth", require("./routes/login.routes"));

app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}... `);
});

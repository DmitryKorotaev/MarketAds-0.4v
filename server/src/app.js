const express = require("express");
const config = require("config");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(__dirname + "/uploads"));
const PORT = config.get("port") || 4100;

app.use("/api/auth", require("./routes/register.routes"));
app.use("/api/auth", require("./routes/login.routes"));

app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}... `);
});

const express = require("express");
const cors = require("cors");
const db = require("./connect")
require("dotenv").config();

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const taskRoutes = require("./src/routes/taskRoutes");
const listRoutes = require("./src/routes/listRoutes");
const authRoutes = require("./src/routes/authRoutes");

app.use("/", taskRoutes);
app.use("/list", listRoutes);
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("hello")
})

// db
//   .authenticate()
//   .then(() => console.log("db connected..."))
//   .catch((err) => console.log(err));

async function testDatabaseConnection() {
  try {
    await db.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

testDatabaseConnection();

function startServer() {
  app.listen(port, () => {
    console.log(`server is running on port ${port}`);
  });
}

startServer();

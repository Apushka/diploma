const express = require("express");
const config = require("config");
const chalk = require("chalk");
const cors = require("cors");
const mongoose = require("mongoose");
const routes = require("./routes");
const initDatabase = require("./startUp/initDatabase");

const app = express();

const PORT = config.get("port") ?? 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/api", routes);

async function start() {
  try {
    mongoose.connection.once("open", () => {
      initDatabase();
    });
    await mongoose.connect(config.get("mongoUri"));
    app.listen(PORT, () => {
      console.log(chalk.green(`Server has been started on port ${PORT}`));
    });
  } catch (e) {
    console.log(chalk.red(e.message));
    process.exit(1);
  }
}

start();

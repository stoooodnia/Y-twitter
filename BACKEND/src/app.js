// ENV config
require("dotenv").config();

// create app
const express = require("express");
const app = express();

// logger setup
const pinoHttp = require("pino-http");
const logger = require("./config/logger.config.js");
const { driver } = require("neo4j-driver");
app.use(pinoHttp({ logger }));

// req, res parsing
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// init database
const initDatabase = require("./config/db.config.js");
initDatabase.configNeo4j();

// destructor
process.on("SIGINT", () => {
  session.close();
  logger.info("Bye bye!");
  process.exit();
});

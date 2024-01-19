// ENV config
require("dotenv").config();

// create app
const express = require("express");
const app = express();

// logger setup
const pinoHttp = require("pino-http");
const logger = require("./config/logger.config.js");
app.use(pinoHttp({ logger, prettyPrint: true }));

// req, res parsing
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// session storage

// EXPERIMENTAL
// TODO: switch to neo4j
const MongoStore = require("connect-mongodb-session")(expressSession);
const mongoStore = new MongoStore({
  uri: "mongodb://localhost:27017",
  databaseName: "my_application_data",
  collection: "appSessions",
});
mongoStore.on("error", (err) => {
  console.log(err);
});

// passport authentication
const passport = require("passport");
const initializePassport = require("./config/passport.config.js");

module.exports = app;

// ENV config
require("dotenv").config();

// create app
const express = require("express");
const app = express();

// logger setup
const pinoHttp = require("pino-http");
const logger = require("./config/logger.config.js");
app.use(pinoHttp({ logger }));

// req, res parsing
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// ENV config
require("dotenv").config();

// create app
const express = require("express");
const app = express();

// logger setup
const logger = require("./config/logger.config.js");
const pinoHttp = require("pino-http");
// app.use(pinoHttp({ logger, prettyPrint: true })); // HTTP request logger

// cors
// const cors = require("cors");
// app.use(cors({ credentials: true, origin: "" }));

// security headers
const helmet = require("helmet");
// app.use(helmet()); // when helmet on photos not load (CSP)

// req, res parsing
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// cookie parser
// app.use(require("cookie-parser")()); // NOT REQUIRED SINCE VERSION 1.5.0, MAY RESULT IN ERRORS

// express flash
app.use(require("express-flash")());

// init database
const initDatabase = require("./config/db.config.js");
initDatabase.configNeo4j();

// session storage setup
const expressSession = require("express-session");
const MemoryStore = require("memorystore")(expressSession);
const memoryStore = new MemoryStore({ checkPeriod: 60 * 1000 }); // 1 minute
const secret = process.env.SECRET_KEY || "super secret key";

const session = expressSession({
  secret: secret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 10,
  },
  store: memoryStore,
});
app.use(session);

// passport authentication
const passport = require("passport");
const initializePassport = require("./config/passport.config.js");
initializePassport(passport);

app.use(passport.initialize());
app.use(passport.session());

// routes
const isAuthenticated = require("./middlewares/isAuthenticated.middleware.js");

app.get("/health-check", require("./controllers/healthCheck.controller.js"));
app.use("/auth", require("./routes/auth.route.js"));
app.use("/user", isAuthenticated, require("./routes/user.route.js"));
app.use("/posts", isAuthenticated, require("./routes/posts.route.js"));

// vue app
const path = __dirname + "/../../FRONTEND/dist/";
app.use(express.static(path));
app.get("/", function (_req, res) {
  res.sendFile(path + "index.html");
});
const history = require("connect-history-api-fallback");
app.use(
  history({
    verbose: true,
  })
);
app.use(express.static(path));

// ssl setup
const fs = require("fs");
const https = require("https");

const server = https.createServer(
  {
    key: fs.readFileSync(__dirname + `/ssl/key.pem`),
    cert: fs.readFileSync(__dirname + `/ssl/cert.pem`),
  },
  app
);

// socket.io setup
const io = require("./config/socket.config.js")(passport, server, session);
require("./socket/socketRouter.js")(io);

// app exports
module.exports = { server };

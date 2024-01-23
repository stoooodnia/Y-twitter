// ENV config
require("dotenv").config();

// create app
const express = require("express");
const app = express();

// logger setup
const logger = require("./config/logger.config.js");
const pinoHttp = require("pino-http");
app.use(pinoHttp({ logger, prettyPrint: true })); // log all requests

// cors
const cors = require("cors");
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));

// req, res parsing
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// cookie parser
app.use(require("cookie-parser")());

// express flash
app.use(require("express-flash")());

// init database
const initDatabase = require("./config/db.config.js");
initDatabase.configNeo4j();

// session storage setup
const { neo4j } = require("./config/db.config.js");
const expressSession = require("express-session");
const MemoryStore = require("memorystore")(expressSession);
const memoryStore = new MemoryStore({ checkPeriod: 60 * 1000 }); // 1 minute

const secret = process.env.SECRET_KEY || "super secret key";

app.use(
  expressSession({
    secret: secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 10,
      expires: 1000 * 60 * 10,
    },
    store: memoryStore,
  })
);

// passport authentication
const passport = require("passport");
const initializePassport = require("./config/passport.config.js");
initializePassport(passport);

app.use(passport.initialize());
app.use(passport.session());

// routes
const isAuthenticated = require("./middlewares/isAuthenticated.middleware.js");

app.use("/auth", require("./routes/auth.route.js"));
app.use("/user", isAuthenticated, require("./routes/user.route.js"));
app.use("/posts", isAuthenticated, require("./routes/posts.route.js"));

// app exports
module.exports = app;

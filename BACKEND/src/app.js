// ENV config
require("dotenv").config();

// create app
const express = require("express");
const app = express();

// logger setup
const logger = require("./config/logger.config.js");
// const pinoHttp = require("pino-http");
// app.use(pinoHttp({ logger, prettyPrint: true })); // log all requests

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
const NeoStore = require("connect-neo4j-user")(expressSession);
const neoStore = new NeoStore({ client: neo4j() });

const secret = process.env.SECRET_KEY || "super secret key";

app.use(
  expressSession({
    secret: secret,
    resave: false,
    saveUninitialized: false,
    expires: 1000 * 60 * 1, // 1 minute
    store: neoStore,
  })
);

// passport authentication
const passport = require("passport");
const initializePassport = require("./config/passport.config.js");
initializePassport(passport);

app.use(passport.initialize());
app.use(passport.session());

// routes

// const isAuthenticated = require("./middlewares/isAuthenticated.middleware.js");
// app.get("/", isAuthenticated, (_req, res) => {
//   logger.info("GET /");
//   res.send("Hello World!");
// });

// const { executeReadTransaction } = require("./config/db.config.js");
// app.get("/test", async (req, res) => {
//   try {
//     const username = "tester2";

//     const getUserQuery = `
//       MATCH (user:User {username: $username})
//       RETURN user
//     `;

//     const result = await executeReadTransaction(getUserQuery, { username });

//     logger.info(result.records[0].get("user").properties);
//   } catch (err) {
//     logger.error(err);
//   }
// });

app.use("/auth", require("./routes/auth.route.js"));
app.use("/user", require("./routes/user.route.js"));
module.exports = app;

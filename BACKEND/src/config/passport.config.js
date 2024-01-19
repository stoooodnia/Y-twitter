const passportLocal = require("passport-local");
const { executeCypherQuery } = require("./db.config.js");
const bcrypt = require("bcrypt");
const logger = require("./logger.config.js");

module.exports = function initializePassport(passport) {
  const validateUser = (login, password, done) => {
    const query = "MATCH (user:User {login: $login}) RETURN user";
    executeCypherQuery(query, { login })
      .then((result) => {
        // parsing result
        const user = result.records[0]
          ? result.records[0].get("user").properties
          : null;

        if (!user) {
          logger.error("Incorrect login");
          return done(null, false, { message: "Incorrect login" });
        }
        bcrypt.compare(password, user.password).then((result) => {
          if (result) {
            logger.info("Correct password");
            return done(null, user);
          } else {
            logger.error("Incorrect password");
            return done(null, false, { message: "Incorrect password" });
          }
        });
      })
      .catch((err) => {
        logger.fatal(`Error validating user in passport: ${err}`);
        return done(err);
      });
  };
  passport.use(
    new passportLocal.Strategy({ usernameField: "login" }, validateUser)
  );
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => {
    const query = "MATCH (user:User) WHERE id(user) = $id RETURN user";
    executeCypherQuery(query, { id })
      .then((result) => {
        // parsing result
        const user = result.records[0]
          ? result.records[0].get("user").properties
          : null;
        if (!user) {
          logger.error("Incorrect id");
          return done(null, false, { message: "Incorrect id" });
        }
        logger.info("User deserialized");
        done(null, {
          id: user.id,
          login: user.login,
          email: user.email,
          role: user.role,
        });
      })
      .catch((err) => {
        logger.error(`Error deserializing user in passport: ${err}`);
        done(err);
      });
  });
};

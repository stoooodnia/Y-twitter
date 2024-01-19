const passportLocal = require("passport-local");
const { executeCypherQuery } = require("./db.config.js");
const bcrypt = require("bcrypt");
const logger = require("./logger.config.js");

module.exports = function initializePassport(passport) {
  const validateUser = (username, password, done) => {
    const query = "MATCH (user:User {username: $username}) RETURN user";
    executeCypherQuery(query, { username })
      .then((result) => {
        // parsing result
        const user = result.records[0]
          ? result.records[0].get("user").properties
          : null;

        if (!user) {
          logger.error("Incorrect username");
          return done(null, false, { message: "Incorrect username" });
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
        logger.fatal(`Error validating user in passport: ${err.message}`);
        return done(err);
      });
  };
  passport.use(
    new passportLocal.Strategy({ usernameField: "username" }, validateUser)
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
          username: user.username,
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

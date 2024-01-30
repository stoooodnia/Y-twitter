const { executeReadTransaction } = require("../config/db.config");
const logger = require("../config/logger.config");

const healthCheck = async (_req, res) => {
  try {
    executeReadTransaction("RETURN 1");
    logger.info("Database OK");
    res.status(200).send({ status: "OK" });
  } catch (err) {
    logger.error(`Error checking database: ${err}`);
    res.status(500).send({ error: err.message });
  }
};
module.exports = healthCheck;

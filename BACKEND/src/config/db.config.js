const neo4jModule = require("neo4j-driver");
const logger = require("./logger.config.js");

let neo4jDriver;

const configNeo4j = () => {
  try {
    const { DATABASE_URL, DATABASE_USERNAME, DATABASE_PASSWORD } = process.env;
    if (!DATABASE_URL || !DATABASE_USERNAME || !DATABASE_PASSWORD) {
      logger.error(
        "Missing .env variables(DATABASE_URL, DATABASE_USERNAME, DATABASE_PASSWORD)"
      );
      throw new Error(
        "Missing .env variables(DATABASE_URL, DATABASE_USERNAME, DATABASE_PASSWORD)"
      );
    }
    const config = {
      maxTransactionRetryTime: 30000,
      maxConnectionPoolSize: 50,
      maxConnectionLIFEtime: 100000,
    };
    const driver = neo4jModule.driver(
      DATABASE_URL,
      neo4jModule.auth.basic(DATABASE_USERNAME, DATABASE_PASSWORD),
      config
    );
    neo4jDriver = driver;
    logger.info("Neo4j driver created, connected to database");
  } catch (error) {
    logger.error("Neo4j error: ", error);
  }
};

const neo4j = () => {
  return neo4jDriver;
};

const executeWriteTransaction = async (statement, params = {}) => {
  try {
    const session = neo4j().session();
    const result = await session.executeWrite((txc) =>
      txc.run(statement, params)
    );
    session.close();
    return result;
  } catch (error) {
    logger.error("Neo4j write transaction error: ", error);
    throw new Error(error);
  }
};

const executeReadTransaction = async (statement, params = {}) => {
  try {
    const session = neo4j().session();
    const result = await session.executeRead((txc) =>
      txc.run(statement, params)
    );
    session.close();
    return result;
  } catch (error) {
    logger.error("Neo4j read transaction error: ", error);
    throw new Error(error);
  }
};

module.exports = {
  configNeo4j,
  neo4j,
  executeWriteTransaction,
  executeReadTransaction,
};

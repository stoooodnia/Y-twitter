const logger = require("../config/logger.config.js");
const {
  executeWriteTransaction,
  executeReadTransaction,
} = require("../config/db.config.js");

const addPost = async (req, res) => {
  try {
    const { userId, content } = req.body;

    const userExistsQuery = "MATCH (user:User {userId: $userId}) RETURN user";
    const userExistsResult = await executeReadTransaction(userExistsQuery, {
      userId,
    });

    if (!userExistsResult.records[0]) {
      return res.send({ error: "User does not exist." });
    }

    const createPostQuery =
      "MATCH (user:User {userId: $userId}) CREATE (user)-[:POSTED]->(post:Post {content: $content, createdAt: timestamp()}) RETURN post";
    const createPostResult = await executeWriteTransaction(createPostQuery, {
      userId,
      content,
    });

    const createdPost = createPostResult.records[0].get("post").properties;

    logger.info("Post created.");
    return res.status(201).send({ success: true, post: createdPost });
  } catch (error) {
    logger.error(`Error creating a post: ${error.message}`);
    return res.send({ error: "Internal Server Error" });
  }
};

module.exports = { addPost };

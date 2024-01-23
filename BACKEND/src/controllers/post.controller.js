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
      "MATCH (user:User {userId: $userId}) CREATE (user)-[:POSTED]->(post:Post {content: $content, createdAt: toString(datetime()), authorName: user.username, authorId: $userId}) RETURN post";
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

const getPostsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    // Sprawdź, czy użytkownik istnieje
    const userExistsQuery = "MATCH (user:User {userId: $userId}) RETURN user";
    const userExistsResult = await executeReadTransaction(userExistsQuery, {
      userId,
    });

    if (!userExistsResult.records[0]) {
      return res.send({ error: "User does not exist." });
    }

    // Pobierz posty danego użytkownika
    const getPostsQuery =
      "MATCH (user:User {userId: $userId})-[:POSTED]->(post:Post) RETURN post";
    const getPostsResult = await executeReadTransaction(getPostsQuery, {
      userId,
    });

    const posts = getPostsResult.records.map(
      (record) => record.get("post").properties
    );
    logger.warn(typeof posts);
    return res.status(200).send({ success: true, posts });
  } catch (error) {
    console.error(`Error fetching posts by user ID: ${error.message}`);
    return res.status(500).send({ error: "Internal Server Error" });
  }
};

module.exports = { addPost, getPostsByUserId };

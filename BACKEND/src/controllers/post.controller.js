const logger = require("../config/logger.config.js");
const { v4: uuidv4 } = require("uuid");
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

    const postId = uuidv4();
    const createPostQuery =
      "MATCH (user:User {userId: $userId}) CREATE (user)-[:POSTED]->(post:Post {content: $content, createdAt: toString(datetime()), authorName: user.username, authorId: $userId, isReply: false, postId: $postId}) RETURN post";
    const createPostResult = await executeWriteTransaction(createPostQuery, {
      userId,
      content,
      postId,
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

    return res.status(200).send({ success: true, posts });
  } catch (error) {
    console.error(`Error fetching posts by user ID: ${error.message}`);
    return res.status(500).send({ error: "Internal Server Error" });
  }
};

const fetchPosts = async (req, res) => {
  try {
    const { userId } = req.params;

    // Sprawdź, czy użytkownik istnieje
    const userExistsQuery = "MATCH (user:User {userId: $userId}) RETURN user";
    const userExistsResult = await executeReadTransaction(userExistsQuery, {
      userId,
    });

    if (!userExistsResult.records[0]) {
      return res.status(400).send({ error: "User does not exist." });
    }

    // Pobierz posty użytkowników, których obserwuje dany użytkownik
    const fetchPostsQuery = `
      MATCH (user:User {userId: $userId})-[:IS_FOLLOWING]->(following:User)-[:POSTED]->(post:Post)
      RETURN post
      ORDER BY post.createdAt DESC
    `;
    const fetchPostsResult = await executeReadTransaction(fetchPostsQuery, {
      userId,
    });

    const posts = fetchPostsResult.records.map(
      (record) => record.get("post").properties
    );

    return res.status(200).send({ success: true, posts });
  } catch (error) {
    console.error(`Error fetching posts by user ID: ${error.message}`);
    return res.status(500).send({ error: "Internal Server Error" });
  }
};

const addReply = async (req, res) => {
  try {
    const { userId, content, postId } = req.body;

    // Sprawdź, czy użytkownik istnieje
    const userExistsQuery = "MATCH (user:User {userId: $userId}) RETURN user";
    const userExistsResult = await executeReadTransaction(userExistsQuery, {
      userId,
    });

    if (!userExistsResult.records[0]) {
      return res.send({ error: "User does not exist." });
    }

    // Sprawdź, czy post istnieje
    const postExistsQuery = "MATCH (post:Post {postId: $postId}) RETURN post";
    const postExistsResult = await executeReadTransaction(postExistsQuery, {
      postId,
    });

    if (!postExistsResult.records[0]) {
      return res.send({ error: "Post does not exist." });
    }

    // Dodaj odpowiedź
    const addReplyQuery = `
      MATCH (user:User {userId: $userId}), (post:Post {postId: $postId})
      CREATE (user)-[:POSTED]->(reply:Post {content: $content, createdAt: toString(datetime()), authorName: user.username, authorId: $userId, isReply: true})-[:REPLY_TO]->(post)
      RETURN reply
    `;
    const addReplyResult = await executeWriteTransaction(addReplyQuery, {
      userId,
      content,
      postId,
    });

    const reply = addReplyResult.records[0].get("reply").properties;

    return res.status(201).send({ success: true, reply });
  } catch (error) {
    console.error(`Error adding reply: ${error.message}`);
    return res.status(500).send({ error: "Internal Server Error" });
  }
};

module.exports = { addPost, getPostsByUserId, fetchPosts, addReply };

const logger = require("../config/logger.config.js");
const { v4: uuidv4 } = require("uuid");
const {
  executeWriteTransaction,
  executeReadTransaction,
} = require("../config/db.config.js");
const { int } = require("neo4j-driver");

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

    const userExistsQuery = "MATCH (user:User {userId: $userId}) RETURN user";
    const userExistsResult = await executeReadTransaction(userExistsQuery, {
      userId,
    });

    if (!userExistsResult.records[0]) {
      return res.send({ error: "User does not exist." });
    }

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
    const { createdAt, direction } = req.query;
    const limit = int(5);

    const userExistsQuery = "MATCH (user:User {userId: $userId}) RETURN user";
    const userExistsResult = await executeReadTransaction(userExistsQuery, {
      userId,
    });

    if (!userExistsResult.records[0]) {
      return res.status(400).send({ error: "User does not exist." });
    }

    let fetchPostsQuery = `
      MATCH (user:User {userId: $userId})-[:IS_FOLLOWING]->(following:User)-[:POSTED]->(post:Post)
    `;

    if (createdAt && direction) {
      fetchPostsQuery += `
        WHERE post.createdAt ${direction === "previous" ? ">" : "<"} $createdAt
      `;
    }

    fetchPostsQuery += `
      RETURN post
      ORDER BY post.createdAt DESC
      LIMIT $limit
    `;

    // console.log(fetchPostsQuery);

    const fetchPostsResult = await executeReadTransaction(fetchPostsQuery, {
      userId,
      createdAt,
      direction,
      limit,
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

    const userExistsQuery = "MATCH (user:User {userId: $userId}) RETURN user";
    const userExistsResult = await executeReadTransaction(userExistsQuery, {
      userId,
    });

    if (!userExistsResult.records[0]) {
      return res.send({ error: "User does not exist." });
    }

    const postExistsQuery = "MATCH (post:Post {postId: $postId}) RETURN post";
    const postExistsResult = await executeReadTransaction(postExistsQuery, {
      postId,
    });

    if (!postExistsResult.records[0]) {
      return res.send({ error: "Post does not exist." });
    }

    const replyId = uuidv4();
    const addReplyQuery = `
      MATCH (user:User {userId: $userId}), (post:Post {postId: $postId})
      CREATE (user)-[:POSTED]->(reply:Post {content: $content, createdAt: toString(datetime()), authorName: user.username, authorId: $userId, isReply: true, postId: $replyId})-[:REPLY_TO]->(post)
      RETURN reply
    `;
    const addReplyResult = await executeWriteTransaction(addReplyQuery, {
      replyId,
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

const fetchReplies = async (req, res) => {
  try {
    const { postId } = req.params;

    const postExistsQuery = "MATCH (post:Post {postId: $postId}) RETURN post";
    const postExistsResult = await executeReadTransaction(postExistsQuery, {
      postId,
    });

    if (!postExistsResult.records[0]) {
      return res.send({ error: "Post does not exist." });
    }

    const fetchRepliesQuery = `
      MATCH (post:Post {postId: $postId})<-[:REPLY_TO]-(reply:Post)
      RETURN reply
      ORDER BY reply.createdAt DESC
    `;
    const fetchRepliesResult = await executeReadTransaction(fetchRepliesQuery, {
      postId,
    });

    const replies = fetchRepliesResult.records.map(
      (record) => record.get("reply").properties
    );

    return res.status(200).send({ success: true, replies });
  } catch (error) {
    console.error(`Error fetching replies: ${error.message}`);
    return res.status(500).send({ error: "Internal Server Error" });
  }
};

const quote = async (req, res) => {
  try {
    const { userId, content, postId } = req.body;

    const userExistsQuery = "MATCH (user:User {userId: $userId}) RETURN user";
    const userExistsResult = await executeReadTransaction(userExistsQuery, {
      userId,
    });

    if (!userExistsResult.records[0]) {
      return res.send({ error: "User does not exist." });
    }

    const postExistsQuery = "MATCH (post:Post {postId: $postId}) RETURN post";
    const postExistsResult = await executeReadTransaction(postExistsQuery, {
      postId,
    });

    if (!postExistsResult.records[0]) {
      return res.send({ error: "Post does not exist." });
    }

    const quoteId = uuidv4();
    const quoteQuery = `
      MATCH (user:User {userId: $userId}), (post:Post {postId: $postId})
      CREATE (user)-[:POSTED]->(quote:Post {content: $content, createdAt: toString(datetime()), authorName: user.username, authorId: $userId, isReply: false, isQuote: true, quotedPostId: $postId, postId: $quoteId})-[:QUOTE]->(post)
      RETURN quote
    `;
    const quoteResult = await executeWriteTransaction(quoteQuery, {
      quoteId,
      userId,
      content,
      postId,
    });

    const quote = quoteResult.records[0].get("quote").properties;

    return res.status(201).send({ success: true, quote });
  } catch (error) {
    console.error(`Error quoting: ${error.message}`);
    return res.status(500).send({ error: "Internal Server Error" });
  }
};

const share = async (req, res) => {
  try {
    const { userId, postId } = req.body;

    const userExistsQuery = "MATCH (user:User {userId: $userId}) RETURN user";
    const userExistsResult = await executeReadTransaction(userExistsQuery, {
      userId,
    });

    if (!userExistsResult.records[0]) {
      return res.send({ error: "User does not exist." });
    }

    const postExistsQuery = "MATCH (post:Post {postId: $postId}) RETURN post";
    const postExistsResult = await executeReadTransaction(postExistsQuery, {
      postId,
    });

    if (!postExistsResult.records[0]) {
      return res.send({ error: "Post does not exist." });
    }

    const shareId = uuidv4();
    const shareQuery = `
      MATCH (user:User {userId: $userId}), (post:Post {postId: $postId})
      CREATE (user)-[:POSTED]->(share:Post {content: null, createdAt: toString(datetime()), authorName: user.username, authorId: $userId, isReply: false, isQuote: true, quotedPostId: $postId, postId: $shareId})-[:SHARE]->(post)
      RETURN share
    `;
    const shareResult = await executeWriteTransaction(shareQuery, {
      shareId,
      userId,
      postId,
    });

    const share = shareResult.records[0].get("share").properties;

    return res.status(201).send({ success: true, share });
  } catch (error) {
    console.error(`Error sharing: ${error.message}`);
    return res.status(500).send({ error: "Internal Server Error" });
  }
};

const getPostById = async (req, res) => {
  try {
    const { postId } = req.params;

    const postExistsQuery = "MATCH (post:Post {postId: $postId}) RETURN post";
    const postExistsResult = await executeReadTransaction(postExistsQuery, {
      postId,
    });

    if (!postExistsResult.records[0]) {
      return res.send({ error: "Post does not exist." });
    }

    const post = postExistsResult.records[0].get("post").properties;

    return res.status(200).send({ success: true, post });
  } catch (error) {
    console.error(`Error fetching post by ID: ${error.message}`);
    return res.status(500).send({ error: "Internal Server Error" });
  }
};

module.exports = {
  addPost,
  getPostsByUserId,
  fetchPosts,
  addReply,
  fetchReplies,
  quote,
  share,
  getPostById,
};

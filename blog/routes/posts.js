const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const Comment = require('../models/comment');
const upload = require('../middleware/multer')

// Search posts by content
router.get('/search', async (req, res) => {
  const { query } = req.query;
  try {
    const posts = await Post.find({ content: { $regex: query, $options: 'i' } }).sort({ createdAt: 'desc' });
    res.status(200).json({ posts });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching search results', error });
  }
});


// Fetch comments for a specific post
router.get('/:postId/comments', async (req, res) => {
  const { postId } = req.params;
  try {
    const comments = await Comment.find({ postId });
    return res.status(200).json({
      statusCode: 200,
      message: 'Fetched comments for post',
      data: { comments },
    });
  } catch (error) {
    console.error('Error fetching comments:', error);
    return res.status(500).json({
      statusCode: 500,
      message: 'Failed to fetch comments',
      error: error.message,
    });
  }
});

// Create a new comment for a specific post
router.post('/:postId/comments', async (req, res) => {
  const { postId } = req.params;
  const { content, author } = req.body;

  // Create a new comment
  const newComment = new Comment({
    postId,
    content,
    author,
  });

  try {
    // Save the comment
    await newComment.save();
    return res.status(201).json({
      statusCode: 201,
      message: 'Comment added successfully',
      data: { comment: newComment },
    });
  } catch (error) {
    console.error('Error adding comment:', error);
    return res.status(500).json({
      statusCode: 500,
      message: 'Failed to add comment',
      error: error.message,
    });
  }
});


//GET posts
router.get('/', async (req, res, next) => {
  
  const posts = await Post.find().sort({ createdAt: 'desc' });

  return res.status(200).json({
    statusCode: 200,
    message: 'Fetched all posts',
    data: { posts },
  });
});

// GET single post by ID
router.get('/:id', async (req, res, next) => {
  const postId = req.params.id;

  if (!postId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({
      statusCode: 400,
      message: 'Invalid post ID format',
    });
  }

  const post = await Post.findById(postId);

  if (!post) {
    return res.status(404).json({
      statusCode: 404,
      message: 'Post not found',
    });
  }

  return res.status(200).json({
    statusCode: 200,
    message: 'Fetched post',
    data: {
      post: post,
    },
  });
});


//make a POST
router.post('/', upload.single('image'), async (req, res, next) => {
  const { title, content, author, tags, category, userId } = req.body;

  //create a new Post
  const post = new Post({
    title,
    content,
    author,
    tags,
    image: req.file ? req.file.path : null,
    category,
    userId,
  });

  // save and post into the database
  await post.save();
  return res.status(201).json({
    statusCode: 201,
    message: 'Created post',
    data: {post},
  });
});

//update a post
router.put('/:id', async (req, res, next) => {
  const { title, content, author, tags } = req.body;

  const post = await Post.findByIdAndUpdate(req.params.id, { title, content, author, tags });

  return res.status(200).json(post)
});

//delete a post
router.delete('/:id', async (req, res, next) => {
  const result = await Post.deleteOne({ _id: req.params.id });
  return res.status(200).json({
    statusCode: 200,
    message: `Deleted ${result.deletedCount} post(s)`,
    dta: {},
  });
})


module.exports = router;
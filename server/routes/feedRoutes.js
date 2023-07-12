const express = require('express');
const router = express.Router();
const feedController = require('../controllers/feedController');

// get post specific comments
router.get(
  '/comment/:post_id',
  feedController.getComments,
  (req, res, next) => {
    res.status(200).json(res.locals.comments);
  },
);

// like a comment
router.patch('/comment', feedController.likeComment, (req, res, next) => {
  res.status(200).json(res.locals.likes);
});

// post a comment
router.post('/comment', feedController.comment, (req, res, next) => {
  res.status(200).json(res.locals.comment);
});

// like a post
router.patch('/like', feedController.likePost, (req, res, next) => {
  res.status(200).json(res.locals.likes);
});

// get all posts
router.get('/', feedController.getPosts, (req, res, next) => {
  res.status(200).json(res.locals.posts);
});

// make a post
router.post('/', feedController.addPost, (req, res, next) => {
  res.status(200).json(res.locals.newPost);
});

// delete a post
router.delete('/', feedController.deletePost, (req, res, next) => {
  res.sendStatus(200);
});

module.exports = router;

const express = require('express');
const router = express.Router();
const feedController = require('../controllers/feedController');

router.get(
  '/comment/:post_id',
  feedController.getComments,
  (req, res, next) => {
    res.status(200).json(res.locals.comments);
  },
);

router.patch('/comment', feedController.likeComment, (req, res, next) => {
  res.status(200).json(res.locals.likes);
});

router.post('/comment', feedController.comment, (req, res, next) => {
  res.status(200).json(res.locals.comment);
});

router.patch('/like', feedController.likePost, (req, res, next) => {
  res.status(200).json(res.locals.likes);
});

router.get('/', feedController.getPosts, (req, res, next) => {
  res.status(200).json(res.locals.posts);
});

router.post('/', feedController.addPost, (req, res, next) => {
  res.sendStatus(200);
});

router.delete('/', feedController.deletePost, (req, res, next) => {
  res.sendStatus(200);
});

module.exports = router;

const express = require('express');
const router = express.Router();
const feedController = require('../controllers/feedController');

router.get('/', feedController.getPosts, (req, res, next) => {
  res.status(200).json(res.locals.posts);
});

// router.get('/_id')

router.post('/', feedController.addPost, (req, res, next) => {
  res.status(200).json(res.locals.newPost);
});

router.delete('/', feedController.deletePost, (req, res, next) => {
  res.sendStatus(200);
});

module.exports = router;

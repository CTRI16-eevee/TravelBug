const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/signup', userController.checkUser, userController.addUser, (req, res, next) => {
  res.status(200).json(res.locals.newUser);
})

router.post('/login',); // logging in existing user

router.get('/profile',) // getting profle data

router.patch('/picture',)

module.exports = router
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// signing up a user
router.post(
  '/signup',
  userController.checkUser,
  userController.addUser,
  userController.signJWT,
  (req, res, next) => {
    res.status(200).json(res.locals.newUser);
  },
);

// logging in a user
router.post(
  '/login',
  userController.loginUser,
  userController.signJWT,
  (req, res, next) => {
    res.status(200).json(res.locals.userInfo);
  },
);

// logging out a user
router.post(
  '/logout',
  userController.verifyJWT,
  userController.logoutUser,
  (req, res, next) => {
    res.sendStatus(200);
  },
);

// getting profile data, user post info for profile page
router.get(
  '/:id',
  userController.verifyJWT,
  userController.getUserPosts,
  (req, res, next) => {
    res.status(200).json(res.locals.allInfo);
  },
); 

// editing a users username, prof_pic, password
router.patch(
  '/edit',
  userController.verifyJWT,
  userController.editUser,
  (req, res, next) => {
    res.sendStatus(200);
  },
); // editing user account

// deleting a user
router.delete(
  '/delete',
  userController.verifyJWT,
  userController.deleteUser,
  (req, res, next) => {
    res.sendStatus(200);
  },
);

module.exports = router;

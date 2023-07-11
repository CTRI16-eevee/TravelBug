const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post(
  '/signup',
  userController.checkUser,
  userController.addUser,
  userController.signJWT,
  (req, res, next) => {
    res.status(200).json(res.locals.newUser);
  },
);

router.post(
  '/login',
  userController.loginUser,
  userController.signJWT,
  (req, res, next) => {
    res.status(200).json(res.locals.userInfo);
  },
);

router.post('/logout',
  userController.verifyJWT,
  userController.logoutUser,
  (req, res, next) => {
    res.sendStatus(200);
  }
)

router.get('/profile'); // getting profle data

router.patch('/edit',
  userController.verifyJWT,
  userController.editUser,
); // editing user account

router.delete('/delete',
  userController.verifyJWT,
  userController.deleteUser,
  (req, res, next) => {
    res.sendStatus(200);
  }
); // deleting account

module.exports = router;

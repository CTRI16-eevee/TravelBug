const db = require('../models/model');
const bcrypt = require('bcrypt');

const userController = {};

userController.checkUser = async (req, res, next) => {
  try {
    //Deconstruct data from request body
    const { username, password } = req.body;
    //Process obtained data
    const values = [username, password];
    const check = `
      SELECT * 
      FROM _user 
      WHERE username = $1
    `;
    const result = await db.query(check, [username]);
    if (!result.rows.length) {
      res.locals.username = username;
      res.locals.password = password;
      console.log('THIS IS NEW USER', res.locals.username, res.locals.password);
      next();
    } else {
      // user already exists
      return next({ error: 'Username already exists' });
    }
  } catch (error) {
    return next(error);
  }
};

userController.addUser = async (req, res, next) => {
  try {
    const { username } = res.locals;
    const { password } = res.locals;
    const saltRounds = 10;

    const hashedPass = await bcrypt.hash(password, saltRounds);
    console.log('THIS IS HASHED PASS', hashedPass);
    const values = [username, hashedPass];
    const addQuery = `
        INSERT INTO
          _user (username, password) 
        VALUES 
          ($1, $2) 
        RETURNING *
      `;
    const addResult = await db.query(addQuery, values);
    res.locals.newUser = addResult.rows;
    console.log('THIS IS NEW USER', res.locals.newUser);
    next();
  } catch (error) {
    next(error);
  }
};

userController.loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const values = [username];
    const text = `
      SELECT *
      FROM _user
      WHERE username = $1
    `;
    const userExists = await db.query(text, values);
    console.log(userExists.rows);
    if (!userExists.rows.length) {
      return next({ error: 'User does not exist' });
    }
    const hash = userExists.rows[0].password;
    const compare = await bcrypt.compare(password, hash);
    if (!compare) {
      return next({ error: 'Incorrect password' });
    }
    res.locals.userInfo = { id: userExists.rows[0].id, profilePicture: userExists.rows[0].profile_picture } 
    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = userController;

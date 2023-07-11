const db = require('../models/model');

const userController = {};

userController.addUser = async (req, res, next) => {
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
    const result = await db.query(check, values);
    if (!result.rows.length) {
      // add row to user table
      const addQuery = `
        INSERT INTO
          _user (username, password) 
        VALUES 
          ($1, $2) 
        RETURNING *
      `;
      const addResult = await db.query(addQuery, values);
      res.locals.newUser = addResult.rows; // probably want to just destructure and persist userID, might be addResult.rows[0]?
      console.log('THIS IS NEW USER', res.locals.newUser);
      next();
    } else {
      // user already exists
      return res.status(409).json({ error: 'Username already exists' });
    }
  } catch (error) {
    return next(error);
  }
};

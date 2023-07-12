const db = require('../models/model');

const feedController = {};

feedController.addPost = async (req, res, next) => {
  try {
    const { author_id, continent_id, image, title, rating, content } = req.body;
    const values = [
      author_id,
      continent_id,
      new Date(),
      0,
      image,
      title,
      rating,
      content,
    ];
    const addPostQuery = `
      INSERT INTO 
      _post (author_id, continent_id, date, likes, image, title, rating, content)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `;
    const newPost = await db.query(addPostQuery, values);
    console.log('THIS IS NEW POST', newPost.rows);
    return next();
  } catch (err) {
    console.log('ERROR OCCURED IN feedController.addPost:', error);
    next({ error: 'Error occured when trying to post' });
  }
};

feedController.getPosts = async (req, res, next) => {
  try {
    const getPostQuery = `
      SELECT * 
      FROM _post
      ORDER BY date DESC
    `;
    const posts = await db.query(getPostQuery);
    console.log('THESE ARE THE POSTS:', posts.rows);
    res.locals.posts = posts.rows;
    return next();
  } catch (err) {
    console.log('ERROR OCCURED IN feedController.getPosts:', error);
    next({ error: 'Error occured when trying to get posts' });
  }
};

feedController.deletePost = async (req, res, next) => {
  try {
    const { id } = req.body;
    const values = [id];
    const deleteQuery = `
      DELETE FROM
        _post
      WHERE 
        id = $1
      RETURNING *
    `;
    const deletePost = await db.query(deleteQuery, values);
    console.log(deletePost);
    return next();
  } catch (error) {
    console.log('ERROR OCCURED IN feedController.deletePost:', error);
    next({ error: 'Error occured when trying to delete post' });
  }
};

module.exports = feedController;

/*
id - PK
author_id - UID FK
continent_id - FK
date - timestamp 
likes - integer
image - link
title - text 
rating - integer
content - text
*/

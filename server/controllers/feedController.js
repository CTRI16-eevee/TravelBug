const db = require('../models/model');

const feedController = {};

/* SHAPE OF POST IN DB
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
    res.locals.newPost = newPost.rows
    console.log('THIS IS NEW POST', newPost.rows);
    return next();
  } catch (err) {
    console.log('ERROR OCCURED IN feedController.addPost:', err);
    next({ error: 'Error occured when trying to post' });
  }
};

feedController.getPosts = async (req, res, next) => {
  try {
  const getPostQuery = `
    SELECT p.*, c.name AS continent_name, u.username, u.profile_picture
    FROM _post AS p
    JOIN _continent AS c ON p.continent_id = c.id
    JOIN _user AS u ON p.author_id = u.id
    ORDER BY p.date DESC;
  `;
    const posts = await db.query(getPostQuery);
    // console.log('THESE ARE THE POSTS:', posts.rows);
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
    // console.log('THIS IS THE DELETED POST', deletePost);
    return next();
  } catch (error) {
    console.log('ERROR OCCURED IN feedController.deletePost:', error);
    next({ error: 'Error occured when trying to delete post' });
  }
};

feedController.likePost = async (req, res, next) => {
  try {
    const { id } = req.body;
    const values = [id];
    const likeQuery = `
      UPDATE _post
      SET likes = likes + 1 
      WHERE id = $1
      RETURNING likes
    `;
    const likedCount = await db.query(likeQuery, values);
    res.locals.likes = likedCount.rows[0].likes;
    return next();
  } catch (err) {
    console.log('ERROR OCCURED IN feedController.likePost:', error);
    next({ error: 'Error occured when trying to like post' });
  }
};

/** COMMENT CONTROLLERS
 * SHAPE OF COMMENT IN DB
 * id
 * author_id
 * post_id
 * date
 * likes
 * content
 */

feedController.comment = async (req, res, next) => {
  try {
    const { author_id, post_id, content } = req.body;
    const values = [author_id, post_id, new Date(), 0, content];
    const commentQuery = `
    INSERT INTO 
    _comment (author_id, post_id, date, likes, content)
    VALUES
    ($1, $2, $3, $4, $5)
    RETURNING *
    `;
    const comment = await db.query(commentQuery, values);
    res.locals.comment = comment.rows[0];
    return next();
  } catch (error) {
    console.log('ERROR OCCURED IN feedController.comment:', error);
    next({ error: 'Error occured when trying to comment' });
  }
};

feedController.likeComment = async (req, res, next) => {
  try {
    const { post_id } = req.body;
    const values = [post_id];
    const likeCommentQuery = `
      UPDATE _comment
      SET likes = likes + 1 
      WHERE id = $1
      RETURNING likes
    `;
    const likedCount = await db.query(likeCommentQuery, values);
    res.locals.likes = likedCount.rows[0].likes;
    return next();
  } catch (error) {
    console.log('ERROR OCCURED IN feedController.likeComment:', error);
    next({ error: 'Error occured when trying to like comment' });
  }
};

feedController.getComments = async (req, res, next) => {
  try {
    const { post_id } = req.params;
    console.log(post_id);
    const values = [post_id];
    const commentQuery = `
      SELECT c.*, u.username, u.profile_picture
      FROM _comment AS c
      JOIN _user AS u ON c.author_id = u.id
      WHERE c.post_id = $1;
    `;
    const comments = await db.query(commentQuery, values);
    res.locals.comments = comments.rows;
    return next();
  } catch (error) {
    console.log('ERROR OCCURED IN feedController.getComments:', error);
    next({ error: 'Error occured when trying to get comments' });
  }
};

module.exports = feedController;



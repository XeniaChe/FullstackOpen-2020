/* eslint-disable no-underscore-dangle */
const blogRouts = require('express').Router();
const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');
const User = require('../models/user');
const Comment = require('../models/comment');

const config = require('../utils/config');

blogRouts.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({})
      .populate('user', {
        username: 1,
        name: 1,
        id: 1,
        user: 1,
      })
      .populate('comments', {
        content: 1,
      });

    return response.json(blogs);
  } catch (error) {
    console.error(error);
    return response
      .status(404)
      .json({ error: 'Error while fetching all blogs' });
  }
});

blogRouts.get('/:id', async (request, response, next) => {
  const blog = await Blog.findById(request.params.id);

  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});

const getTokenFrom = (request) => {
  const authorization = request.get('authorization');

  console.log(`authorization ${JSON.stringify(authorization)}`);

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }
  return null;
};

blogRouts.post('/', async (request, response) => {
  try {
    const { body } = request;

    if (
      body.title === undefined ||
      body.title === '' ||
      body.url === undefined
    ) {
      return response
        .status(400)
        .json({ error: 'Bad request. content is missing ' });
    }

    if (body.likes === undefined || body.likes === '') {
      body.likes = 0;
    }

    const token = getTokenFrom(request);

    const decodedToken = jwt.verify(token, config.secret);

    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' });
    }

    /*
    // after CONNETED WITH USERS. before TOKEN.
    const user = await User.findById(body.userId);
    */

    // after TOKEN
    const user = await User.findById(decodedToken.id);

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id,
      comments: [],
    });

    const savedBlog = await blog.save();

    // ADD THIS NEW BLOG TO USER'S BLOGS ARRAY
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    return response.status(201).json(savedBlog);
  } catch (error) {
    console.error(error);
    return response.status(404).json({ error: 'Error while adding a blog' });
  }
});

blogRouts.delete('/:id', async (request, response) => {
  try {
    const blog = await Blog.findById(request.params.id);

    const userCreator = await User.findById(blog.user.toString());

    const requestToken = getTokenFrom(request);
    const decodedToken = jwt.verify(requestToken, config.secret);

    console.log(`decoded token: ${JSON.stringify(decodedToken)}`);
    console.log(userCreator._id.toString() === decodedToken.id.toString());

    if (userCreator._id.toString() !== decodedToken.id.toString()) {
      return response.satus(401).json({ error: 'invalid token for delete' });
    }

    await Blog.findByIdAndDelete(request.params.id);

    return response.status(204).end();
  } catch (error) {
    console.error(error);
    return response.status(404).json({ error: 'Error while deleting a blog' });
  }
});

blogRouts.put('/:id', async (request, response) => {
  try {
    const { body } = request;

    const blogToUpdate = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: body.userId,
    };

    await Blog.findByIdAndUpdate(request.params.id, blogToUpdate, {
      new: true,
    });

    return response.json(blogToUpdate);
  } catch (error) {
    console.error(error);
    return response.status(404).json({ error: 'Error while updating a blog' });
  }
});

blogRouts.post('/:id/comments', async (request, response) => {
  try {
    const { id } = request.params;
    const { body } = request;

    const token = getTokenFrom(request);
    const dekodedToken = jwt.verify(token, config.secret);

    if (!token || !dekodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' });
    }

    const newComment = new Comment({
      content: body.newComment,
      blog: id,
    });
    // Add creted comment to 'Comments' col-n
    const savedComment = await newComment.save();

    const blog = await Blog.findById(id);
    // Add creted comment to blog.comments and UPDATE 'Blogs' col-n
    blog.comments = blog.comments.concat(savedComment.id);
    await blog.save();

    return response.status(201).json(savedComment);
  } catch (error) {
    console.error(error);
    return response.status(404).json({ error: 'Error while adding a comment' });
  }
});
module.exports = blogRouts;

/* eslint-disable no-underscore-dangle */
const blogRouts = require('express').Router();
const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');
const User = require('../models/user');

const config = require('../utils/config');

blogRouts.get('/', async (request, response, next) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
    id: 1,
    user: 1,
  });

  response.json(blogs);
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
  console.log(request.authorization);
  console.log(`authorization ${JSON.stringify(authorization)}`);
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }
  return null;
};

// eslint-disable-next-line consistent-return
blogRouts.post('/', async (request, response) => {
  const { body } = request;

  if (body.title === undefined || body.title === '' || body.url === undefined) {
    return response
      .status(400)
      .json({ error: 'Bad request. content is missing ' });
  }

  if (body.likes === undefined || body.likes === '') {
    body.likes = 0;
  }

  // COULDN'T GET TOKEN FROM getTokenFrom() COS AUTHORIZATION HEADER IS MISSING (?)
  // const token = getTokenFrom(request);

  // const token =
  //   getTokenFrom(request) ||
  //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ijl0ZXN0aW4gdXNlciIsImlkIjoiNWZhZTgyMjUzMWU1Zjc0ZTIwNzM2MmZjIiwiaWF0IjoxNjA1MjcyNTI2fQ.Ab_b_zTk0p3VZV54YHOJ9D2KdiGI2YVZ9SoCUJbPNdk';

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
  });

  const savedBlog = await blog.save();

  // ADD THIS NEW BLOG TO USER'S BLOGS ARRAY
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
});

blogRouts.delete('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id);

  const userCreator = await User.findById(blog.user.toString());

  const requestToken = getTokenFrom(request);

  const decodedToken = jwt.verify(requestToken, config.secret);

  console.log(request.body);
  console.log(decodedToken);

  if (userCreator._id.toString() !== decodedToken.id.toString()) {
    return response.json({ error: 'invalid token for delete' });
  }

  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

blogRouts.put('/:id', async (request, response) => {
  const { body } = request;

  const blogToUpdate = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: body.userId,
  };

  await Blog.findByIdAndUpdate(request.params.id, blogToUpdate, { new: true });
  response.json(blogToUpdate);
});

module.exports = blogRouts;

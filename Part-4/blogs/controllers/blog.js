const blogRouts = require('express').Router();
const Blog = require('../models/blog');

blogRouts.get('/', async (request, response, next) => {
  const blogs = await Blog.find({});

  response.json(blogs);

  /*
  try {
    const blogs = await Blog.find({});
    response.json(blogs);
  } catch (exception) {
    next(exception);
  }
  */
});

blogRouts.get('/:id', async (request, response, next) => {
  const blog = await Blog.findById(request.params.id);

  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
  /*
  try {
    const blog = await Blog.findById(request.params.id);
    if (blog) {
      response.json(blog);
    } else {
      response.status(404).end();
    }
  } catch (exception) {
    next(exception);
  }
  */
});

// eslint-disable-next-line consistent-return
blogRouts.post('/', async (request, response, next) => {
  // eslint-disable-next-line prefer-destructuring
  const body = request.body;

  if (body.title === undefined || body.title === '' || body.url === undefined) {
    return response
      .status(400)
      .json({ error: 'Bad request. content is missing ' });
  }
  if (body.likes === undefined || body.likes === '') {
    // eslint-disable-next-line no-unused-expressions
    body.likes = 0;
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  });

  const result = await blog.save();
  response.status(201).json(result);
  /*
  try {
    const result = await blog.save();
    response.status(201).json(result);
  } catch (exception) {
    next(exception);
  }
  */
});

module.exports = blogRouts;

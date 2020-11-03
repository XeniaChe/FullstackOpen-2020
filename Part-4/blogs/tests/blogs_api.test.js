const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const helper = require('../utils/api_test_helper');
const Blog = require('../models/blog');
const logger = require('../utils/logger');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  let newBlog = new Blog(helper.initialBlogs[0]);
  await newBlog.save();
  newBlog = new Blog(helper.initialBlogs[1]);
  await newBlog.save();
});

describe('first initial tests', () => {
  test('result should be in JSON format', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('content-type', /application\/json/);
  });

  test('test amount shoild be ', async () => {
    const result = await helper.blogsInDb();
    expect(result).toHaveLength(2);
  });

  test('blog without title or URL will not be added', async () => {
    const newBlog = {
      title: '',
      likes: 5,
    };

    await api.post('/api/blogs').send(newBlog).expect(400);
    const allBlogs = await api.get('/api/blogs');
    expect(allBlogs.body).toHaveLength(2);
  });

  test('have unique id', async () => {
    const allBlogs = await helper.blogsInDb();
    const { id } = allBlogs[0];
    const singleBlog = await api.get(`/api/blogs/${id}`);
    expect(singleBlog.body.id).toBeDefined();
  });

  test(' New blog. Successful HTTP POST request', async () => {
    const newBlog = {
      title: 'testing blog',
      author: 'JEST library',
      url: 'http://someUrl',
      likes: 15,
    };

    await api.post('/api/blogs').send(newBlog).expect(201);
    const allBlogs = await helper.blogsInDb();
    expect(allBlogs).toHaveLength(helper.initialBlogs.length + 1);
  });

  test(' New blog. No likes means 0.', async () => {
    const newBlog = {
      title: "testing blog's likes",
      author: 'JEST library',
      url: 'http://someUrl',
    };

    const result = await api.post('/api/blogs').send(newBlog);
    logger.info(result.body);
    expect(result.body.likes).toBe(0);
  });
});

afterAll(() => mongoose.connection.close());

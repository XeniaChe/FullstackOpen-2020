/* eslint-disable no-underscore-dangle */
/* eslint-disable quotes */
const mongoose = require('mongoose');
const supertest = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../app');
const helper = require('../utils/api_test_helper');
const Blog = require('../models/blog');
const User = require('../models/user');
const config = require('../utils/config');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  const newBlogs = helper.initialBlogs.map((el) => new Blog(el));
  const promiseArray = newBlogs.map((el) => el.save());
  await Promise.all(promiseArray);
});

describe('first initial tests', () => {
  test('result should be in JSON format', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('content-type', /application\/json/);
  });

  test('test amount should be ', async () => {
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
      user: '5fae822531e5f74e207362fc',
    };

    await api.post('/api/blogs').send(newBlog).expect(201);
    const allBlogs = await helper.blogsInDb();
    expect(allBlogs).toHaveLength(helper.initialBlogs.length + 1);
  });

  test(' New blog. No likes means 0.', async () => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ijl0ZXN0aW4gdXNlciIsImlkIjoiNWZhZTgyMjUzMWU1Zjc0ZTIwNzM2MmZjIiwiaWF0IjoxNjA1MjcyNTI2fQ.Ab_b_zTk0p3VZV54YHOJ9D2KdiGI2YVZ9SoCUJbPNdk';
    const decodedToken = jwt.verify(token, config.secret);

    const user = await User.findById(decodedToken.id);

    const newBlog = {
      title: "testing blog's likes",
      author: 'JEST library',
      url: 'http://someUrl',
      likes: '',
      user: user._id,
    };

    const result = await api.post('/api/blogs').send(newBlog);
    expect(result.body.likes).toBe(0);
  });
});

describe('deleting blogs', () => {
  test('blog deleted', async () => {
    const allBlogs = await helper.blogsInDb();
    const blogToDelete = allBlogs[0];
    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);
  });
});

describe('updating', () => {
  test("blog's likes updating", async () => {
    const updatedBlog = {
      title: 'first blog',
      author: 'Xenia',
      url: 'http://someUrl',
      likes: 45,
    };

    const allBlogs = await helper.blogsInDb();
    const blogToUpdate = allBlogs[0];

    const returnedBlog = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog);
    expect(returnedBlog.body.likes).toBe(45);
  });
});

afterAll(() => mongoose.connection.close());

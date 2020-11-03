const Blog = require('../models/blog');

const initialBlogs = [
  {
    title: 'first blog',
    author: 'Xenia',
    url: 'http://someUrl',
    likes: 25,
  },
  {
    title: 'second blog',
    author: 'Xenia',
    url: 'http://someUrl',
    likes: 35,
  },
];
const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = { blogsInDb, initialBlogs };

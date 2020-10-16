const helperList = require('../utils/list-helper');

describe('helper list', () => {
  test('dummy returns one', () => {
    const blogs = [];
    const result = helperList.dummy(blogs);

    expect(result).toBe(1);
  });
});

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },

  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url:
      'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url:
      'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url:
      'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 1,
    __v: 0,
  },
];

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url:
        'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0,
    },
  ];

  test('when list has only one blog, equals the likes of that', () => {
    const result = helperList.likesTotal(listWithOneBlog);
    expect(result).toBe(5);
  });
  test('suLikes of the list of blogs', () => {
    const res = helperList.likesTotal(blogs);
    expect(res).toBe(35);
  });
});

describe('the favorite blog', () => {
  test('winner', () => {
    const res = helperList.favoriteBlog(blogs);
    expect(res).toEqual({
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    });
  });
});

describe('most productive author', () => {
  test('author winner ', () => {
    const res = helperList.mostBlogs(blogs);
    expect(res).toEqual({
      author: 'Robert C. Martin',
      blogs: 3,
    });
  });
});

describe('most popular author', () => {
  test('author with most blogs likes', () => {
    const res = helperList.mostLikes(blogs);
    expect(res).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17,
    });
  });
});

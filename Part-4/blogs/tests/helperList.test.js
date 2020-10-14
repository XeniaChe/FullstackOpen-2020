const helperList = require('../utils/list-helper');

describe('helper list', () => {
  test('dummy returns one', () => {
    const blogs = [];
    const result = helperList.dummy(blogs);

    expect(result).toBe(1);
  });
});

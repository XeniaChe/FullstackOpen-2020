import React, { useState } from 'react';
const Blog = ({ blog }) => {
  const [showMore, setShowMore] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  let label = !showMore ? 'view' : 'hide';
  const visibleIfShowMore = { display: showMore ? '' : 'none' };

  const toogleShow = () => {
    setShowMore(!showMore);
  };

  return (
    <div style={blogStyle}>
      {blog.title}
      <button onClick={toogleShow}>{label}</button>
      <div style={visibleIfShowMore}>
        <p>{blog.author}</p>
        <p>{blog.url}</p>
        <p>likes:{blog.likes} </p>
        <p>{blog.author}</p>
      </div>
    </div>
  );
};

export default Blog;

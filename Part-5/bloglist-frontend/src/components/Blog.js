import React, { useState } from 'react';
import blogServices from '../services/blogs';

const Blog = ({ blog }) => {
  const [showMore, setShowMore] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const likesBoxStyle = {
    display: 'flex',
  };

  let label = !showMore ? 'view' : 'hide';
  const visibleIfShowMore = { display: showMore ? '' : 'none' };

  const toogleShow = () => {
    setShowMore(!showMore);
  };

  const likesPlusOne = (oldCount) => ++oldCount;

  const increaseLikesHandler = async () => {
    // increase local state likes by 1
    const newCount = likesPlusOne(blog.likes);
    // console.log(`new likes count ${newCount}`);

    //create new updated blog to send
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: newCount,
      userId: blog.user.id,
    };

    // get clicked blog's id
    const id = blog.id;

    // send new blog to the server with PUT request
    const blogReturned = await blogServices.updateBlog(id, updatedBlog);
    console.log(`Blog updated. New likes count: ${blogReturned.likes}`);
  };

  return (
    <div style={blogStyle}>
      {blog.title}
      <button onClick={toogleShow}>{label}</button>
      <div style={visibleIfShowMore}>
        <p>author: {blog.author}</p>
        <p>{blog.url}</p>
        <div style={likesBoxStyle}>
          <p>likes: {blog.likes} </p>
          <button onClick={increaseLikesHandler}>like</button>
        </div>
        <p>user: {blog.user.name}</p>
      </div>
    </div>
  );
};

export default Blog;

import React, { useState } from 'react';

const BlogForm = ({ sendBlog }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' });

  const setNewBlogHandler = (event) => {
    let fieldName = event.target.id;
    let value = event.target.value;

    setNewBlog((prevState) => {
      return { ...prevState, [fieldName]: value };
    });
  };

  const clearInputAfter = () => {
    setNewBlog({ title: '', author: '', url: '' });
    console.log(`cleaning fired`);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    await sendBlog(newBlog, clearInputAfter);
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <label htmlFor='title'>Title:</label>
        <input
          type='text'
          name='title'
          id='title'
          value={newBlog.title}
          onChange={setNewBlogHandler}
        />
        <label htmlFor='author'>Author:</label>
        <input
          type='text'
          name='author'
          id='author'
          value={newBlog.author}
          onChange={setNewBlogHandler}
        />
        <label htmlFor='url'>URL:</label>
        <input
          type='text'
          name='url'
          id='url'
          value={newBlog.url}
          onChange={setNewBlogHandler}
        />
        <button type='submit'>create</button>
      </form>
    </div>
  );
};

export default BlogForm;
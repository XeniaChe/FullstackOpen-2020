import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import logInService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const logInHandler = async (event) => {
    event.preventDefault();
    console.log(`User: ${userName}, ${password} will soon be logged in`);
    const user = await logInService.logIn({ userName, password });
    setUser(user);
    console.log(user.name);
  };

  const showLoginForm = () => (
    <div>
      <h2> Loo in to application</h2>
      <form onSubmit={logInHandler}>
        <input
          type='text'
          name='name'
          onInput={({ target }) => {
            setUserName(target.value);
          }}
        />
        <input
          type='password'
          name='password'
          onInput={({ target }) => {
            setPassword(target.value);
          }}
        />
        <button type='submit'>Log in</button>
      </form>
    </div>
  );

  const showBlogs = () => (
    <div>
      {' '}
      <h2>{userName} is logged-in</h2>
      <button>log out</button>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );

  return (
    <div>
      <h2>blogs</h2>
      {user === null ? showLoginForm() : showBlogs()}
    </div>
  );
};

export default App;
